<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ContactInquiryMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function send(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name'     => 'required|string|max:100',
            'email'    => 'required|email|max:150',
            'category' => 'required|string|max:100',
            'message'  => 'required|string|min:10|max:2000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors'  => $validator->errors(),
            ], 422);
        }

        $adminEmail = config('mail.admin_email', env('MAIL_ADMIN_EMAIL', 'admin@vhsmatelier.com'));

        try {
            Mail::to($adminEmail)->send(new ContactInquiryMail(
                senderName:  $request->input('name'),
                senderEmail: $request->input('email'),
                category:    $request->input('category'),
                message:     $request->input('message'),
            ));
        } catch (\Exception $e) {
            // Log the error but don't expose it to the client
            \Illuminate\Support\Facades\Log::error('Contact mail failed: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Unable to send message at this time. Please try again later.',
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Your message has been received. We will respond within 48 hours.',
        ]);
    }
}
