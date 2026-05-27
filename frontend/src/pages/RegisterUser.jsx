import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Check, User, Phone } from 'lucide-react';
import Header from '../components/Header';
import { requestRegister } from '../config/UserRequest';
import { message } from 'antd';
import { useStore } from '../hooks/useStore';
import Footer from '../components/Footer';

function RegisterUser() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const { fetchAuth } = useStore();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Mật khẩu không khớp!');
            return;
        }
        if (!agreeTerms) {
            alert('Vui lòng đồng ý với điều khoản dịch vụ!');
            return;
        }
        try {
            await requestRegister({ ...formData, agreeTerms });
            message.success('Đăng ký thành công!');
            fetchAuth();
            navigate('/login');
        } catch (error) {
            message.error(error.response.data.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-['Inter',sans-serif]">
            <Header />

            <main className="min-h-[calc(100vh-72px)] flex">
                {/* Left Side - Image */}
                <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2070')] 
                                   bg-cover bg-center"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0a2e14]/90 via-[#16A34A]/80 to-[#22c55e]/70" />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col justify-center px-12 lg:px-16 xl:px-24">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2.5 mb-6">
                            <svg viewBox="0 0 40 40" className="w-12 h-12" fill="none">
                                <rect
                                    x="2"
                                    y="6"
                                    width="36"
                                    height="28"
                                    rx="3"
                                    stroke="white"
                                    strokeWidth="2.5"
                                    fill="none"
                                />
                                <line x1="20" y1="6" x2="20" y2="34" stroke="white" strokeWidth="2" />
                                <circle cx="20" cy="20" r="5" stroke="white" strokeWidth="2" fill="none" />
                                <rect x="2" y="13" width="6" height="14" stroke="white" strokeWidth="1.5" fill="none" />
                                <rect
                                    x="32"
                                    y="13"
                                    width="6"
                                    height="14"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    fill="none"
                                />
                            </svg>
                            <span className="text-2xl font-bold text-white">
                                Alo<span className="text-white/80">Booking</span>
                            </span>
                        </Link>

                        {/* Main marketing content to match provided design */}
                        <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-4">
                            Đăng ký miễn phí
                            <br />
                            <span className="text-[#86efac]">quản lý sân ngay hôm nay</span>
                        </h1>

                        <p className="text-lg text-white/80 max-w-lg leading-relaxed mb-8">
                            Chỉ cần 30 giây để tạo tài khoản. Thêm chi nhánh, sân và bắt đầu nhận đặt lịch trực tuyến ngay
                            sau khi đăng nhập.
                        </p>

                        <div className="grid grid-cols-2 gap-4 max-w-md">
                            <div className="px-4 py-3 rounded-lg bg-white/6 border border-white/8 text-white">
                                Miễn phí 30 ngày
                            </div>
                            <div className="px-4 py-3 rounded-lg bg-white/6 border border-white/8 text-white">
                                Đăng ký 30 giây
                            </div>
                            <div className="px-4 py-3 rounded-lg bg-white/6 border border-white/8 text-white">
                                Lưu trữ cloud an toàn
                            </div>
                            <div className="px-4 py-3 rounded-lg bg-white/6 border border-white/8 text-white">
                                Hỗ trợ cài đặt 1-1
                            </div>
                        </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-40 -mb-40" />
                    <div className="absolute top-20 right-20 w-40 h-40 bg-white/5 rounded-full" />
                </div>

                {/* Right Side - Register Form */}
                <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12">
                    <div className="w-full max-w-[520px]">
                        {/* Form Card */}
                        <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(2,6,23,0.12)] p-6 lg:p-8">
                            {/* Header */}
                            <div className="mb-6">
                                <div className="inline-block px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-semibold mb-3">
                                    TẠO TÀI KHOẢN CHỦ SÂN
                                </div>
                                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1">Bắt đầu hành trình của bạn 🚀</h2>
                                <p className="text-gray-500 text-sm">Tạo tài khoản để bắt đầu quản lý sân thể thao chuyên nghiệp</p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Full Name Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Nhập họ và tên"
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg
                                                     text-gray-700 placeholder-gray-400
                                                     focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A]
                                                     transition-all duration-200"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email & Phone - two columns on md+ */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="0901 234 567"
                                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg
                                                         text-gray-700 placeholder-gray-400
                                                         focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A]
                                                         transition-all duration-200"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="email@example.com"
                                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg
                                                         text-gray-700 placeholder-gray-400
                                                         focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A]
                                                         transition-all duration-200"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Full Name Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Nguyễn Văn A"
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg
                                                     text-gray-700 placeholder-gray-400
                                                     focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A]
                                                     transition-all duration-200"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Nhập mật khẩu (ít nhất 8 ký tự)"
                                            className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg
                                                     text-gray-700 placeholder-gray-400
                                                     focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A]
                                                     transition-all duration-200"
                                            required
                                            minLength={8}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Xác nhận mật khẩu
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Nhập lại mật khẩu"
                                            className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg
                                                     text-gray-700 placeholder-gray-400
                                                     focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A]
                                                     transition-all duration-200"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Agree Terms */}
                                <div className="pt-2">
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <div
                                            onClick={() => setAgreeTerms(!agreeTerms)}
                                            className={`w-5 h-5 mt-0.5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200
                                                      ${
                                                          agreeTerms
                                                              ? 'bg-[#16A34A] border-[#16A34A]'
                                                              : 'border-gray-300 group-hover:border-[#16A34A]'
                                                      }`}
                                        >
                                            {agreeTerms && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        <span className="text-sm text-gray-600 leading-relaxed">
                                            Tôi đồng ý với{' '}
                                            <Link to="/terms" className="text-[#16A34A] hover:underline">
                                                Điều khoản dịch vụ
                                            </Link>{' '}
                                            và{' '}
                                            <Link to="/privacy" className="text-[#16A34A] hover:underline">
                                                Chính sách bảo mật
                                            </Link>
                                        </span>
                                    </label>
                                </div>

                                {/* Register Button */}
                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-3 py-3.5
                                             bg-gradient-to-r from-[#24c26b] to-[#16A34A]
                                             text-white font-semibold rounded-3xl
                                             shadow-[0_8px_30px_rgba(34,197,94,0.22)]
                                             transition-all duration-200 active:scale-[0.99]"
                                >
                                    🚀 Đăng ký & Bắt đầu
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="flex items-center gap-4 my-6">
                                <div className="flex-1 h-px bg-gray-200" />
                                <span className="text-sm text-gray-400">Hoặc</span>
                                <div className="flex-1 h-px bg-gray-200" />
                            </div>

                            {/* Google Register */}

                            {/* Login Link */}
                            <p className="text-center mt-6 text-gray-600">
                                Đã có tài khoản?{' '}
                                <Link
                                    to="/login"
                                    className="text-[#16A34A] hover:text-[#15803d] font-semibold transition-colors"
                                >
                                    Đăng nhập
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default RegisterUser;
