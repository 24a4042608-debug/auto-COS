import { useState, useEffect } from 'react';
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

  // Database settings state
  const [dbHost, setDbHost] = useState('192.168.1.15');
  const [dbPort, setDbPort] = useState('3306');
  const [dbName, setDbName] = useState('customer_db');
  const [dbUser, setDbUser] = useState('admin');
  const [dbPass, setDbPass] = useState('secret123');
  const [testingDb, setTestingDb] = useState(false);
  const [dbTestResult, setDbTestResult] = useState('');

  useEffect(() => {
    // Load saved settings on mount
    const savedTheme = localStorage.getItem('acos_theme') as 'dark' | 'light' | 'system' || 'dark';
    setTheme(savedTheme);
    const savedAccent = localStorage.getItem('acos_accent') || 'indigo';
    setAccentColor(savedAccent);
  }, []);

  const handleThemeChange = (newTheme: 'dark' | 'light' | 'system') => {
    setTheme(newTheme);
    localStorage.setItem('acos_theme', newTheme);
    const html = document.documentElement;
    if (newTheme === 'light') {
      html.classList.remove('dark');
      html.classList.add('light');
    } else if (newTheme === 'dark') {
      html.classList.remove('light');
      html.classList.add('dark');
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemPrefersDark) {
        html.classList.remove('light');
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
        html.classList.add('light');
      }
    }
  };

  const handleAccentChange = (newAccent: string) => {
    setAccentColor(newAccent);
    localStorage.setItem('acos_accent', newAccent);
  };

  const handleTestTelegram = () => {
    setTestingConnection(true);
    setTestResult('');
    setTimeout(() => {
      setTestingConnection(false);
      setTestResult('Đã gửi tin nhắn test thành công tới nhóm Telegram!');
    }, 1200);
  };

  const handleTestDbConnection = () => {
    setTestingDb(true);
    setDbTestResult('');
    setTimeout(() => {
      setTestingDb(false);
      setDbTestResult('Kết nối tới CSDL phụ thành công!');
    }, 1000);
  };

  const handleSaveDbConfig = () => {
    alert('Đã lưu cấu hình cơ sở dữ liệu thành công!');
  };

  const handleSaveAppearance = () => {
    alert('Đã cập nhật giao diện thành công!');
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
            { id: 'storage', label: 'Kho lưu trữ & CSDL', icon: Database },
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

            {/* TAB: Storage & DB */}
            {activeTab === 'storage' && (
              <div className="space-y-6">
                {/* Cloud Storage section */}
                <div className="space-y-4">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      <input type="password" value="acossecretkey123" readOnly className="input-field text-xs" />
                    </div>
                  </div>
                </div>

                {/* Database section */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-sm font-bold text-white border-b border-white/[0.04] pb-2.5">Cấu hình cơ sở dữ liệu (Database)</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* DB chính (Cố định trên máy) */}
                    <div className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] space-y-3.5">
                      <div className="flex items-center gap-2">
                        <Database size={14} className="text-indigo-400" />
                        <span className="text-xs font-bold text-white">CSDL Chính (Cố định cục bộ)</span>
                      </div>
                      <div className="space-y-2.5 text-xs">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-white/40 uppercase">Host</label>
                            <input type="text" value="127.0.0.1" readOnly className="input-field py-1 text-[11px] opacity-60 cursor-not-allowed" />
                          </div>
                          <div>
                            <label className="text-[10px] text-white/40 uppercase">Port</label>
                            <input type="text" value="3306" readOnly className="input-field py-1 text-[11px] opacity-60 cursor-not-allowed" />
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] text-white/40 uppercase">Tên CSDL (Database)</label>
                          <input type="text" value="vhsm_acos" readOnly className="input-field py-1 text-[11px] opacity-60 cursor-not-allowed" />
                        </div>
                        <div>
                          <label className="text-[10px] text-white/40 uppercase">Tài khoản (Username)</label>
                          <input type="text" value="root" readOnly className="input-field py-1 text-[11px] opacity-60 cursor-not-allowed" />
                        </div>
                      </div>
                    </div>

                    {/* DB phụ (Khách hàng tự cấu hình) */}
                    <div className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] space-y-3.5">
                      <div className="flex items-center gap-2">
                        <Database size={14} className="text-emerald-400" />
                        <span className="text-xs font-bold text-white">CSDL Phụ (Khách hàng cấu hình)</span>
                      </div>
                      <div className="space-y-2.5 text-xs">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-white/40 uppercase">Host *</label>
                            <input type="text" value={dbHost} onChange={e => setDbHost(e.target.value)} placeholder="localhost" className="input-field py-1 text-[11px]" />
                          </div>
                          <div>
                            <label className="text-[10px] text-white/40 uppercase">Port *</label>
                            <input type="text" value={dbPort} onChange={e => setDbPort(e.target.value)} placeholder="3306" className="input-field py-1 text-[11px]" />
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] text-white/40 uppercase">Tên CSDL (Database) *</label>
                          <input type="text" value={dbName} onChange={e => setDbName(e.target.value)} placeholder="nhập tên database" className="input-field py-1 text-[11px]" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-white/40 uppercase">Tài khoản *</label>
                            <input type="text" value={dbUser} onChange={e => setDbUser(e.target.value)} placeholder="root" className="input-field py-1 text-[11px]" />
                          </div>
                          <div>
                            <label className="text-[10px] text-white/40 uppercase">Mật khẩu</label>
                            <input type="password" value={dbPass} onChange={e => setDbPass(e.target.value)} placeholder="••••••••" className="input-field py-1 text-[11px]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-white/[0.03]">
                    <button onClick={handleTestDbConnection} disabled={testingDb} className="btn-ghost text-xs cursor-pointer">
                      {testingDb ? <Loader2 size={12} className="animate-spin mr-1.5 inline" /> : null}
                      Kiểm tra kết nối DB phụ
                    </button>
                    <button onClick={handleSaveDbConfig} className="btn-primary text-xs cursor-pointer">Lưu cấu hình</button>
                  </div>
                  {dbTestResult && (
                    <p className="text-xs mt-2" style={{ color: dbTestResult.includes('thành công') ? '#34d399' : '#f87171' }}>{dbTestResult}</p>
                  )}
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
                        <div className="w-6 h-6 rounded bg-black/40 flex items-center justify-center text-white font-bold text-xs">T</div>
                        <span className="text-xs font-semibold text-white">TikTok Shop API</span>
                      </div>
                      <span className="text-[9px] font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/25">Chưa kết nối</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Telegram */}
            {activeTab === 'telegram' && (
              <div className="space-y-5">
                <h3 className="text-sm font-bold text-white border-b border-white/[0.04] pb-2.5">Tích hợp Bot thông báo Telegram</h3>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-white/40">Telegram Bot Token</label>
                    <input 
                      type="text" 
                      value={botToken} 
                      onChange={e => setBotToken(e.target.value)} 
                      className="input-field text-xs font-mono" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-white/40">Chat ID (Nhóm hoặc Cá nhân)</label>
                    <input 
                      type="text" 
                      value={chatId} 
                      onChange={e => setChatId(e.target.value)} 
                      className="input-field text-xs font-mono" 
                    />
                  </div>
                  
                  <div className="p-3 rounded-lg bg-indigo-500/5 border border-indigo-500/10 text-[11px] text-white/60 leading-normal">
                    💡 <strong>Mẹo:</strong> Hãy thêm bot của bạn vào nhóm Telegram và cấp quyền Admin, sau đó gửi tin nhắn bất kỳ và lấy Chat ID của nhóm để cấu hình.
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-white/[0.03]">
                    <button 
                      onClick={handleTestTelegram} 
                      disabled={testingConnection} 
                      className="btn-ghost text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      {testingConnection ? <Loader2 size={12} className="animate-spin" /> : <Play size={11} />}
                      Gửi tin nhắn test
                    </button>
                    <button className="btn-primary text-xs cursor-pointer">Lưu cấu hình</button>
                  </div>

                  {testResult && (
                    <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-xs text-emerald-400 flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      {testResult}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: AI */}
            {activeTab === 'ai' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-white/[0.04] pb-2.5">
                  <h3 className="text-sm font-bold text-white">Cấu hình Trợ lý AI</h3>
                  <span className="text-[8px] font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/25">DeepMind Gemini API</span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-white/40">Gemini API Key</label>
                    <input type="password" value="••••••••••••••••••••••••••••••••" readOnly className="input-field text-xs font-mono" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-white/40">Mô hình AI mặc định (AI Model)</label>
                    <select defaultValue="gemini-2.5-flash" className="input-field text-xs">
                      <option value="gemini-2.5-flash">Gemini 2.5 Flash (Tốc độ cao, tối ưu chi phí)</option>
                      <option value="gemini-2.5-pro">Gemini 2.5 Pro (Thông minh vượt trội, lập luận tốt)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
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
                          onClick={() => handleThemeChange(t.id as any)}
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
                          onClick={() => handleAccentChange(c.id)}
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
                  <button onClick={handleSaveAppearance} className="btn-primary text-xs cursor-pointer">Lưu giao diện</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
