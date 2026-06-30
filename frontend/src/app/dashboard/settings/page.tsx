'use client';

import { useState } from 'react';
import { 
  Settings, Database, Globe, Sliders, Bell, Sparkles, 
  CheckCircle2, AlertCircle, Play, ShieldCheck, Moon, Sun, Monitor, Loader2
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'storage' | 'publisher' | 'telegram' | 'ai' | 'appearance'>('general');
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');
  const [accentColor, setAccentColor] = useState('indigo');
  
  // Telegram settings state
  const [botToken, setBotToken] = useState('7192847192:AAH-xk2841_jx829147128');
  const [chatId, setChatId] = useState('-1002847192847');
  const [testResult, setTestResult] = useState('');
  const [testingConnection, setTestingConnection] = useState(false);

  const handleTestTelegram = () => {
    setTestingConnection(true);
    setTestResult('');
    setTimeout(() => {
      setTestingConnection(false);
      setTestResult('Đã gửi tin nhắn test thành công tới nhóm Telegram!');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Cài đặt hệ thống</h1>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Cấu hình kết nối API, kho lưu trữ, kênh phân phối và trợ lý AI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Left Sidebar Navigation */}
        <div className="glass-card p-2 space-y-1 md:col-span-1">
          {[
            { id: 'general', label: 'Thông tin chung', icon: Settings },
            { id: 'storage', label: 'Kho lưu trữ', icon: Database },
            { id: 'publisher', label: 'Kênh phân phối', icon: Globe },
            { id: 'telegram', label: 'Tích hợp Telegram', icon: Sliders },
            { id: 'ai', label: 'Trợ lý AI', icon: Sparkles },
            { id: 'appearance', label: 'Giao diện', icon: Moon },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-2.5 border border-transparent cursor-pointer"
                style={{
                  background: isActive ? 'rgba(99,102,241,0.06)' : 'transparent',
                  color: isActive ? '#a5b4fc' : 'rgba(255,255,255,0.45)',
                  borderColor: isActive ? 'rgba(99,102,241,0.1)' : 'transparent',
                }}
              >
                <Icon size={13} className={isActive ? 'text-indigo-400' : 'text-white/40'} />
                {tab.label}
                {tab.id === 'ai' && (
                  <span className="ml-auto text-[8px] font-bold px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">AI</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Content Area */}
        <div className="md:col-span-3">
          <div className="glass-card p-6 min-h-[400px]">
            {/* TAB: General */}
            {activeTab === 'general' && (
              <div className="space-y-5">
                <h3 className="text-sm font-bold text-white border-b border-white/[0.04] pb-2.5">Cửa hàng & Doanh nghiệp</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-white/40">Tên cửa hàng</label>
                    <input type="text" defaultValue="ACOS Fashion" className="input-field text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-white/40">Ngành hàng chính</label>
                    <select defaultValue="fashion" className="input-field text-xs">
                      <option value="fashion">Thời trang & May mặc</option>
                      <option value="electronics">Điện tử & Công nghệ</option>
                      <option value="cosmetics">Mỹ phẩm & Làm đẹp</option>
                      <option value="general">Khác</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-white/40">Tên miền con (Subdomain)</label>
                    <div className="flex">
                      <input type="text" defaultValue="fashion" className="input-field text-xs rounded-r-none border-r-0" />
                      <span className="px-3 py-2 rounded-r-lg bg-white/[0.04] border border-white/[0.1] text-xs text-white/40 flex items-center">.acos.vn</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-white/40">Tên miền riêng</label>
                    <input type="text" placeholder="Ví dụ: my-store.com" className="input-field text-xs" />
                  </div>
                </div>
                <div className="space-y-1.5 pt-2">
                  <label className="text-[10px] uppercase font-bold text-white/40">Địa chỉ liên hệ</label>
                  <textarea rows={3} defaultValue="Số 10, Đường Cầu Giấy, Hà Nội, Việt Nam" className="input-field text-xs" />
                </div>
                <div className="flex justify-end pt-3">
                  <button className="btn-primary text-xs cursor-pointer">Lưu thay đổi</button>
                </div>
              </div>
            )}

            {/* TAB: Storage */}
            {activeTab === 'storage' && (
              <div className="space-y-5">
                <h3 className="text-sm font-bold text-white border-b border-white/[0.04] pb-2.5">Cấu hình lưu trữ đám mây</h3>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-bold text-white/40 block">Phương thức lưu trữ</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-lg border border-indigo-500/20 bg-indigo-500/5 flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-2.5">
                        <Database size={15} className="text-indigo-400" />
                        <div>
                          <p className="text-xs font-semibold text-white">MinIO Local</p>
                          <p className="text-[9px] text-white/40">Lưu trữ trên máy chủ nội bộ</p>
                        </div>
                      </div>
                      <CheckCircle2 size={14} className="text-indigo-400" />
                    </div>
                    <div className="p-3.5 rounded-lg border border-white/[0.04] bg-white/[0.01] flex items-center justify-between opacity-50 cursor-pointer hover:opacity-80 transition-opacity">
                      <div className="flex items-center gap-2.5">
                        <Database size={15} className="text-white/40" />
                        <div>
                          <p className="text-xs font-semibold text-white">AWS S3</p>
                          <p className="text-[9px] text-white/40">Lưu trữ Amazon Cloud</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-white/40">S3 Endpoint URL</label>
                    <input type="text" defaultValue="http://localhost:9000" className="input-field text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-white/40">Tên Bucket</label>
                    <input type="text" defaultValue="acos-media" className="input-field text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-white/40">Access Key ID</label>
                    <input type="text" defaultValue="acosadmin123" className="input-field text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-white/40">Secret Access Key</label>
                    <input type="password" value="••••••••••••••••••••" readOnly className="input-field text-xs" />
                  </div>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-white/[0.03]">
                  <button className="btn-ghost text-xs cursor-pointer">Kiểm tra kết nối</button>
                  <button className="btn-primary text-xs cursor-pointer">Lưu cấu hình</button>
                </div>
              </div>
            )}

            {/* TAB: Publisher */}
            {activeTab === 'publisher' && (
              <div className="space-y-5">
                <h3 className="text-sm font-bold text-white border-b border-white/[0.04] pb-2.5">API Kênh bán hàng (Đăng tải tự động)</h3>
                <div className="space-y-4">
                  {/* Shopee */}
                  <div className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded bg-orange-500/10 flex items-center justify-center text-orange-400 font-bold text-xs">S</div>
                        <span className="text-xs font-semibold text-white">Shopee API Connection</span>
                      </div>
                      <span className="text-[9px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">Đã kết nối</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div className="space-y-1">
                        <span className="text-white/35 text-[9px] uppercase">Partner ID</span>
                        <input type="text" defaultValue="2004821" className="input-field py-1 text-[11px]" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-white/35 text-[9px] uppercase">Shop ID</span>
                        <input type="text" defaultValue="99812481" className="input-field py-1 text-[11px]" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-white/35 text-[9px] uppercase">Hạn kết nối</span>
                        <div className="py-2 text-[11px] font-medium text-white/70">30 ngày nữa</div>
                      </div>
                    </div>
                  </div>

                  {/* TikTok Shop */}
                  <div className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded bg-black/40 border border-white/10 flex items-center justify-center text-white font-bold text-[10px]">TT</div>
                        <span className="text-xs font-semibold text-white">TikTok Shop Partner API</span>
                      </div>
                      <span className="text-[9px] font-semibold px-2 py-0.5 rounded bg-white/[0.05] text-white/40 border border-white/[0.08]">Chưa kết nối</span>
                    </div>
                    <button className="btn-ghost text-xs py-1.5 px-3 cursor-pointer">Ủy quyền cửa hàng</button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Telegram */}
            {activeTab === 'telegram' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-white/[0.04] pb-2.5">
                  <h3 className="text-sm font-bold text-white">Tích hợp Telegram Bot</h3>
                  <span className="text-[9px] font-semibold px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/25">
                    Sắp ra mắt
                  </span>
                </div>

                <p className="text-xs text-white/50 leading-relaxed">
                  Cho phép nhận báo cáo doanh thu, tồn kho tự động hàng ngày và phê duyệt nhanh các sản phẩm do AI sinh ra bằng cách ra lệnh trực tiếp trên ứng dụng chat Telegram.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-white/45 flex items-center gap-1">
                      Bot Token (API Token)
                    </label>
                    <input 
                      type="text" 
                      value={botToken} 
                      onChange={e => setBotToken(e.target.value)}
                      className="input-field text-xs font-mono" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-white/45">
                      Chat ID (ID Nhóm nhận báo cáo)
                    </label>
                    <input 
                      type="text" 
                      value={chatId} 
                      onChange={e => setChatId(e.target.value)}
                      className="input-field text-xs font-mono" 
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-lg border border-white/[0.04] space-y-3" style={{ background: 'rgba(255,255,255,0.01)' }}>
                  <span className="text-[10px] uppercase font-bold text-white/35 tracking-wider block">Lịch tự động gửi báo cáo:</span>
                  <div className="flex items-center gap-3 text-xs text-white/70">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded border-white/10 text-indigo-500 bg-transparent" />
                      Báo cáo cuối ngày (22:00)
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" className="rounded border-white/10 text-indigo-500 bg-transparent" />
                      Cảnh báo hết kho (Thời gian thực)
                    </label>
                  </div>
                </div>

                {testResult && (
                  <div className="flex items-center gap-2.5 p-3 rounded-lg text-xs" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)', color: '#34d399' }}>
                    <CheckCircle2 size={14} /> {testResult}
                  </div>
                )}

                <div className="flex justify-between items-center pt-3 border-t border-white/[0.03]">
                  <button 
                    onClick={handleTestTelegram} 
                    disabled={testingConnection} 
                    className="btn-ghost text-xs flex items-center gap-1.5 cursor-pointer bg-transparent"
                  >
                    {testingConnection ? <Loader2 size={12} className="animate-spin" /> : <Play size={12} />}
                    Kiểm tra kết nối
                  </button>
                  <button className="btn-primary text-xs cursor-pointer">Lưu cấu hình</button>
                </div>
              </div>
            )}

            {/* TAB: AI Placeholders */}
            {activeTab === 'ai' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-white/[0.04] pb-2.5">
                  <h3 className="text-sm font-bold text-white">Trợ lý AI vận hành tự động</h3>
                  <span className="text-[9px] font-semibold px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/25">
                    Đặc quyền SaaS
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Card 1 */}
                  <div className="p-4 rounded-xl border border-purple-500/10 bg-gradient-to-br from-purple-500/5 to-indigo-500/0 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-[0.02] group-hover:opacity-[0.06] transition-opacity pointer-events-none" style={{ background: 'radial-gradient(circle, #a78bfa, transparent)', filter: 'blur(15px)' }} />
                    <div className="flex items-start justify-between">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-purple-500/20" style={{ background: 'rgba(167,139,250,0.08)' }}>
                        <Sparkles size={13} className="text-purple-400" />
                      </div>
                      <span className="text-[8px] font-bold px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">COMING SOON</span>
                    </div>
                    <h4 className="text-xs font-semibold text-white mt-3">AI Content Engine</h4>
                    <p className="text-[10px] text-white/40 mt-1 leading-normal">Tự động crawl sản phẩm của đối thủ, viết lại tiêu đề và mô tả chuẩn SEO độc nhất tránh quét bản quyền.</p>
                  </div>

                  {/* Card 2 */}
                  <div className="p-4 rounded-xl border border-purple-500/10 bg-gradient-to-br from-purple-500/5 to-indigo-500/0 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-[0.02] group-hover:opacity-[0.06] transition-opacity pointer-events-none" style={{ background: 'radial-gradient(circle, #a78bfa, transparent)', filter: 'blur(15px)' }} />
                    <div className="flex items-start justify-between">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-purple-500/20" style={{ background: 'rgba(167,139,250,0.08)' }}>
                        <Sparkles size={13} className="text-purple-400" />
                      </div>
                      <span className="text-[8px] font-bold px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">COMING SOON</span>
                    </div>
                    <h4 className="text-xs font-semibold text-white mt-3">AI SEO Optimizer</h4>
                    <p className="text-[10px] text-white/40 mt-1 leading-normal">Tự động gắn thẻ tag tối ưu tìm kiếm và chuẩn hóa hình ảnh/video khớp với thuật toán tìm kiếm trên Shopee.</p>
                  </div>

                  {/* Card 3 */}
                  <div className="p-4 rounded-xl border border-purple-500/10 bg-gradient-to-br from-purple-500/5 to-indigo-500/0 relative overflow-hidden group sm:col-span-2">
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-[0.02] group-hover:opacity-[0.06] transition-opacity pointer-events-none" style={{ background: 'radial-gradient(circle, #a78bfa, transparent)', filter: 'blur(20px)' }} />
                    <div className="flex items-start justify-between">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-purple-500/20" style={{ background: 'rgba(167,139,250,0.08)' }}>
                        <Sparkles size={13} className="text-purple-400" />
                      </div>
                      <span className="text-[8px] font-bold px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">COMING SOON</span>
                    </div>
                    <h4 className="text-xs font-semibold text-white mt-3">AI Price & Inventory Predictor</h4>
                    <p className="text-[10px] text-white/40 mt-1 leading-normal">Sử dụng Machine Learning để phân tích xu hướng mua sắm của người dùng, dự báo biến động lượng hàng tồn kho và đề xuất khoảng giá bán cạnh tranh tối ưu lợi nhuận.</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Appearance */}
            {activeTab === 'appearance' && (
              <div className="space-y-5">
                <h3 className="text-sm font-bold text-white border-b border-white/[0.04] pb-2.5">Giao diện người dùng</h3>
                
                {/* Theme mode */}
                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-bold text-white/40 block">Chủ đề (Theme Mode)</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'dark', label: 'Tối (Dark)', icon: Moon },
                      { id: 'light', label: 'Sáng (Light)', icon: Sun },
                      { id: 'system', label: 'Hệ thống', icon: Monitor }
                    ].map(t => {
                      const Icon = t.icon;
                      const isSelected = theme === t.id;
                      return (
                        <div 
                          key={t.id} 
                          onClick={() => setTheme(t.id as any)}
                          className="p-3 rounded-lg border flex flex-col items-center gap-2 cursor-pointer text-center transition-all"
                          style={{
                            borderColor: isSelected ? '#6366f1' : 'rgba(255,255,255,0.04)',
                            background: isSelected ? 'rgba(99,102,241,0.05)' : 'rgba(255,255,255,0.01)'
                          }}
                        >
                          <Icon size={16} className={isSelected ? 'text-indigo-400' : 'text-white/40'} />
                          <span className="text-xs text-white/80">{t.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Accent Color */}
                <div className="space-y-3 pt-2">
                  <label className="text-[10px] uppercase font-bold text-white/40 block">Màu sắc chủ đạo (Accent Color)</label>
                  <div className="flex gap-4">
                    {[
                      { id: 'indigo', color: '#6366f1', label: 'Indigo' },
                      { id: 'emerald', color: '#10b981', label: 'Emerald' },
                      { id: 'violet', color: '#8b5cf6', label: 'Violet' },
                      { id: 'rose', color: '#f43f5e', label: 'Rose' }
                    ].map(c => {
                      const isSelected = accentColor === c.id;
                      return (
                        <div 
                          key={c.id} 
                          onClick={() => setAccentColor(c.id)}
                          className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all border-2"
                          style={{
                            backgroundColor: c.color,
                            borderColor: isSelected ? 'white' : 'transparent',
                            boxShadow: isSelected ? `0 0 12px ${c.color}` : 'none'
                          }}
                          title={c.label}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-white/[0.03]">
                  <button className="btn-primary text-xs cursor-pointer">Lưu giao diện</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
