import { useState } from 'react';
import { 
  Globe, Clock, Play, CheckCircle2, AlertCircle, RefreshCw, 
  ArrowRight, Search, Filter, Zap, ExternalLink, ShieldAlert,
  ShoppingBag, ChevronRight, ListOrdered
} from 'lucide-react';

interface SyncJob {
  id: string;
  productName: string;
  sku: string;
  channel: 'shopee' | 'tiktok' | 'lazada';
  status: 'waiting' | 'processing' | 'success' | 'failed';
  progress?: number;
  errorMessage?: string;
  updatedAt: string;
}

export default function PublisherPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'waiting' | 'processing' | 'success' | 'failed'>('all');
  const [channelFilter, setChannelFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState<SyncJob | null>(null);

  // Mock sync queue data
  const [jobs, setJobs] = useState<SyncJob[]>([
    { id: 'JOB-001', productName: 'Áo Thun Cotton Active - Trắng - M', sku: 'TS-ACTIVE-WHT-M', channel: 'shopee', status: 'processing', progress: 65, updatedAt: '2 phút trước' },
    { id: 'JOB-002', productName: 'Quần Jean Slimfit Levi\'s 511 - Xanh', sku: 'JEAN-SLIM-BLU', channel: 'tiktok', status: 'waiting', updatedAt: '5 phút trước' },
    { id: 'JOB-003', productName: 'iPhone 15 Pro Max 256GB - Titan Tự Nhiên', sku: 'IP15PM-256-NAT', channel: 'shopee', status: 'success', updatedAt: '10 phút trước' },
    { id: 'JOB-004', productName: 'Áo Hoodie Streetwear Unisex - Đen', sku: 'HD-STREET-BLK-L', channel: 'lazada', status: 'failed', errorMessage: 'Mã ngành hàng (Category ID) không hợp lệ trên Lazada API.', updatedAt: '1 giờ trước' },
    { id: 'JOB-005', productName: 'Váy Hoa Nhí Vintage Dáng Dài', sku: 'DR-VINT-FLW-S', channel: 'tiktok', status: 'success', updatedAt: '2 giờ trước' },
    { id: 'JOB-006', productName: 'Tai nghe Bluetooth Không Dây ACOS Pro', sku: 'EAR-PRO-WHT', channel: 'lazada', status: 'success', updatedAt: '3 giờ trước' },
    { id: 'JOB-007', productName: 'Áo Khoác Gió Thể Thao Chống Nước', sku: 'JK-WIND-BLU-XL', channel: 'shopee', status: 'failed', errorMessage: 'Lỗi xác thực Token Shop (Access Token expired).', updatedAt: '4 giờ trước' }
  ]);

  const handleRetry = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setJobs(prev => prev.map(job => {
      if (job.id === id) {
        return { ...job, status: 'processing', progress: 10, errorMessage: undefined };
      }
      return job;
    }));
    // Simulate progress
    setTimeout(() => {
      setJobs(prev => prev.map(job => {
        if (job.id === id) {
          return { ...job, status: 'success', progress: 100, updatedAt: 'Vừa xong' };
        }
        return job;
      }));
    }, 2000);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.productName.toLowerCase().includes(search.toLowerCase()) || job.sku.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = activeTab === 'all' || job.status === activeTab;
    const matchesChannel = channelFilter === 'all' || job.channel === channelFilter;
    return matchesSearch && matchesStatus && matchesChannel;
  });

  const getChannelBadge = (channel: string) => {
    switch (channel) {
      case 'shopee':
        return <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">Shopee</span>;
      case 'tiktok':
        return <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-black/40 text-white border border-white/10">TikTok</span>;
      case 'lazada':
        return <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">Lazada</span>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'waiting':
        return <span className="badge text-[10px] bg-white/[0.04] text-white/60 border border-white/[0.08]">Chờ xử lý</span>;
      case 'processing':
        return <span className="badge text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Đang đồng bộ</span>;
      case 'success':
        return <span className="badge text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Thành công</span>;
      case 'failed':
        return <span className="badge text-[10px] bg-red-500/10 text-red-400 border border-red-500/20">Thất bại</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Hàng đợi Đăng tải (Publisher Queue)</h1>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Theo dõi tiến trình đồng bộ sản phẩm tự động lên các sàn thương mại điện tử Shopee, TikTok Shop, Lazada.
          </p>
        </div>
      </div>

      {/* Queue Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { title: 'Đang xử lý', count: jobs.filter(j => j.status === 'processing').length, color: '#818cf8', icon: RefreshCw },
          { title: 'Chờ đồng bộ', count: jobs.filter(j => j.status === 'waiting').length, color: 'rgba(255,255,255,0.4)', icon: Clock },
          { title: 'Đã hoàn thành', count: jobs.filter(j => j.status === 'success').length, color: '#34d399', icon: CheckCircle2 },
          { title: 'Lỗi đồng bộ', count: jobs.filter(j => j.status === 'failed').length, color: '#f87171', icon: AlertCircle },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="glass-card p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-semibold text-white/35">{stat.title}</span>
                <div className="text-xl font-bold text-white mt-1">{stat.count}</div>
              </div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/[0.04]" style={{ background: 'rgba(255,255,255,0.01)' }}>
                <Icon size={14} style={{ color: stat.color }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters and Queue List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left: Queue List (2/3 width) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Controls */}
          <div className="glass-card p-4 flex flex-wrap gap-3 items-center border-none">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input 
                type="text" 
                placeholder="Tìm theo tên sản phẩm, SKU..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-field text-xs pl-9" 
              />
            </div>
            
            <select 
              value={channelFilter} 
              onChange={e => setChannelFilter(e.target.value)}
              className="input-field text-xs"
              style={{ width: 'auto', minWidth: '130px' }}
            >
              <option value="all">Tất cả kênh</option>
              <option value="shopee">Shopee</option>
              <option value="tiktok">TikTok Shop</option>
              <option value="lazada">Lazada</option>
            </select>
          </div>

          {/* Queue Tab list */}
          <div className="glass-card overflow-hidden">
            <div className="flex border-b border-white/[0.04] bg-white/[0.01]">
              {[
                { id: 'all', label: 'Tất cả tác vụ' },
                { id: 'processing', label: 'Đang xử lý' },
                { id: 'waiting', label: 'Chờ xử lý' },
                { id: 'success', label: 'Thành công' },
                { id: 'failed', label: 'Lỗi' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className="flex-1 py-3 text-xs font-medium border-b-2 transition-all cursor-pointer bg-transparent text-center"
                  style={{
                    borderColor: activeTab === tab.id ? '#6366f1' : 'transparent',
                    color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.4)'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="divide-y divide-white/[0.03]">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-12 text-xs text-white/30">
                  <ListOrdered size={24} className="mx-auto mb-2 opacity-30" />
                  Không có tác vụ nào trong hàng đợi
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <div 
                    key={job.id} 
                    onClick={() => setSelectedJob(job)}
                    className="p-4 hover:bg-white/[0.01] transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    style={{ background: selectedJob?.id === job.id ? 'rgba(255,255,255,0.015)' : undefined }}
                  >
                    <div className="space-y-1.5 min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-white/[0.04] text-white/50">{job.id}</span>
                        {getChannelBadge(job.channel)}
                        {getStatusBadge(job.status)}
                      </div>
                      <h4 className="text-xs font-medium text-white truncate">{job.productName}</h4>
                      <div className="text-[10px] text-white/35 flex items-center gap-2">
                        <span>SKU: {job.sku}</span>
                        <span>·</span>
                        <span>Cập nhật: {job.updatedAt}</span>
                      </div>
                      
                      {/* Active Progress Bar */}
                      {job.status === 'processing' && (
                        <div className="w-full max-w-xs space-y-1 pt-1">
                          <div className="w-full h-1 bg-white/[0.04] rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${job.progress}%` }} />
                          </div>
                          <span className="text-[8px] text-indigo-400 font-semibold">{job.progress}% đang đồng bộ...</span>
                        </div>
                      )}

                      {/* Inline Error Display */}
                      {job.status === 'failed' && job.errorMessage && (
                        <p className="text-[10px] text-red-400 bg-red-500/5 p-1.5 rounded border border-red-500/10 flex items-center gap-1.5 mt-1.5">
                          <AlertCircle size={10} /> {job.errorMessage}
                        </p>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 sm:self-center" onClick={e => e.stopPropagation()}>
                      {job.status === 'failed' && (
                        <button 
                          onClick={(e) => handleRetry(job.id, e)}
                          className="btn-ghost text-[10px] py-1 px-2.5 hover:bg-white/[0.04] cursor-pointer"
                        >
                          <RefreshCw size={10} /> Thử lại
                        </button>
                      )}
                      <button 
                        onClick={() => setSelectedJob(job)}
                        className="w-7 h-7 rounded flex items-center justify-center text-white/35 hover:text-white hover:bg-white/[0.04] transition-all bg-transparent border-none cursor-pointer"
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right: Job Timeline (1/3 width) */}
        <div className="glass-card p-5 space-y-5">
          <div className="flex items-center gap-2 border-b border-white/[0.04] pb-3">
            <Zap size={13} className="text-indigo-400" />
            <h3 className="font-semibold text-xs uppercase tracking-wider text-white/40">Trục thời gian xử lý</h3>
          </div>

          {selectedJob ? (
            <div className="space-y-4">
              {/* Job Summary */}
              <div className="p-3 rounded-lg border border-white/[0.03]" style={{ background: 'rgba(255,255,255,0.01)' }}>
                <span className="text-[9px] text-white/35 uppercase font-semibold">Tác vụ đang chọn</span>
                <div className="text-xs font-semibold text-white mt-1 truncate">{selectedJob.productName}</div>
                <div className="flex items-center gap-2 mt-2">
                  {getChannelBadge(selectedJob.channel)}
                  <span className="font-mono text-[9px] text-white/40">SKU: {selectedJob.sku}</span>
                </div>
              </div>

              {/* Timeline Items */}
              <div className="relative border-l border-white/[0.05] ml-2 pl-4 space-y-4 py-1">
                {selectedJob.status === 'success' && (
                  <>
                    <div className="relative">
                      <span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-[#0c0c14]" />
                      <div className="text-xs font-medium text-white">Đăng tải thành công</div>
                      <div className="text-[9px] text-white/45 mt-0.5">Sản phẩm đã được duyệt hiển thị trực tuyến trên gian hàng.</div>
                      <div className="text-[8px] text-white/25 mt-0.5">14:30:15 · API Shopee</div>
                    </div>
                    <div className="relative">
                      <span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-[#0c0c14]" />
                      <div className="text-xs font-medium text-white">Tải tệp đa phương tiện</div>
                      <div className="text-[9px] text-white/45 mt-0.5">Đã tải 4 ảnh sản phẩm lên CDN của Shopee thành công.</div>
                      <div className="text-[8px] text-white/25 mt-0.5">14:30:12 · Hệ thống</div>
                    </div>
                  </>
                )}

                {selectedJob.status === 'processing' && (
                  <>
                    <div className="relative">
                      <span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-[#0c0c14] animate-pulse" />
                      <div className="text-xs font-medium text-white">Đang gửi dữ liệu sản phẩm</div>
                      <div className="text-[9px] text-white/45 mt-0.5">Đang truyền tải dữ liệu thuộc tính và phân loại sản phẩm.</div>
                      <div className="text-[8px] text-white/25 mt-0.5">Vừa xong · API Shopee</div>
                    </div>
                    <div className="relative">
                      <span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-white/30 ring-4 ring-[#0c0c14]" />
                      <div className="text-xs font-medium text-white">Xác thực Token Shop</div>
                      <div className="text-[9px] text-white/45 mt-0.5">Kiểm tra kết nối và token đại lý thành công.</div>
                      <div className="text-[8px] text-white/25 mt-0.5">1 phút trước · Hệ thống</div>
                    </div>
                  </>
                )}

                {selectedJob.status === 'failed' && (
                  <>
                    <div className="relative">
                      <span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-red-500 ring-4 ring-[#0c0c14]" />
                      <div className="text-xs font-medium text-white">Thất bại (Gặp lỗi)</div>
                      <div className="text-[9px] text-red-400/80 mt-0.5">{selectedJob.errorMessage}</div>
                      <div className="text-[8px] text-white/25 mt-0.5">15 phút trước · API Channel</div>
                    </div>
                    <div className="relative">
                      <span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-[#0c0c14]" />
                      <div className="text-xs font-medium text-white">Kiểm định dữ liệu</div>
                      <div className="text-[9px] text-white/45 mt-0.5">Dữ liệu sản phẩm cục bộ hợp lệ, bắt đầu đồng bộ API.</div>
                      <div className="text-[8px] text-white/25 mt-0.5">16 phút trước · Hệ thống</div>
                    </div>
                  </>
                )}

                <div className="relative">
                  <span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-white/20 ring-4 ring-[#0c0c14]" />
                  <div className="text-xs font-medium text-white/60">Tạo tác vụ đăng tải</div>
                  <div className="text-[9px] text-white/35 mt-0.5">Sản phẩm được kích hoạt đồng bộ thủ công hoặc tự động.</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-xs text-white/30">
              <ExternalLink size={20} className="mx-auto mb-2 opacity-25" />
              Chọn một tác vụ trong hàng đợi để xem chi tiết tiến trình API.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
