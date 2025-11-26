# ❤️ Zen Particles 3D - 爱心粒子手势控制

一个使用摄像头手势控制3D爱心粒子的交互式Web应用，基于 React、Three.js 和 MediaPipe 实现。

## ✨ 功能特点

- ❤️ **爱心粒子特效**：5000个粒子组成的3D爱心形状
- 🎨 **多种形状**：爱心、球体、立方体、螺旋等
- 🎥 **实时手势识别**：使用 MediaPipe 检测双手手势
- 👌 **手势缩放控制**：双手距离控制粒子大小
- 💫 **流畅动画**：优化的性能，60fps 流畅运行
- 🌈 **自定义颜色**：多种颜色主题选择
- 📱 **响应式设计**：支持桌面和移动设备

## 🚀 在线演示

访问：`https://YOUR_USERNAME.github.io/zen-particles-3d/`

（部署后替换为你的实际地址）

## 🎮 使用方法

1. **允许摄像头权限**
2. **双手捏合手势**：拇指和食指相触
3. **控制缩放**：
   - 双手距离越远 → 粒子越大
   - 双手距离越近 → 粒子越小
4. **切换形状**：点击右上角按钮选择不同形状
5. **更换颜色**：点击颜色按钮自定义主题

## 🛠️ 技术栈

- ⚛️ **React 19** - UI框架
- 🎨 **Three.js** - 3D渲染引擎
- 🔷 **React Three Fiber** - React的Three.js封装
- 👁️ **MediaPipe** - 手势识别
- ⚡ **Vite** - 构建工具
- 💙 **TypeScript** - 类型安全

## 📦 本地开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问：`http://localhost:3000`

### 构建生产版本

```bash
npm run build
```

## 🚀 部署到 GitHub Pages

详细部署说明请查看 [部署指南.md](./部署指南.md)

快速部署：

```bash
# 1. 在 GitHub 创建仓库 zen-particles-3d

# 2. 添加远程仓库（替换YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/zen-particles-3d.git

# 3. 推送代码
git branch -M main
git push -u origin main

# 4. 在 GitHub 仓库 Settings → Pages 中启用 GitHub Actions
```

## 🎯 性能优化

- ✅ 粒子数量优化（5000个）
- ✅ 手势响应速度提升 50%
- ✅ 高性能渲染模式
- ✅ 摄像头帧率优化（30-60fps）
- ✅ 流畅的动画插值

## 📱 浏览器支持

- ✅ Chrome 90+
- ✅ Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+

## 🔒 隐私说明

- 摄像头数据仅在本地处理
- 不上传任何视频或图像数据
- 完全客户端运行，保护隐私

## 📄 许可证

MIT License

---

**享受3D粒子特效的乐趣！** ✨
