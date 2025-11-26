# 🚀 部署到 GitHub Pages

本项目配置为自动部署到 GitHub Pages，国内可直接访问，无需代理。

## 📋 部署步骤

### 1. 创建 GitHub 仓库

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: 爱心粒子3D手势控制"

# 添加远程仓库（替换为你的用户名）
git remote add origin https://github.com/YOUR_USERNAME/zen-particles-3d.git

# 推送到 GitHub
git push -u origin main
```

### 2. 启用 GitHub Pages

1. 进入 GitHub 仓库页面
2. 点击 **Settings** (设置)
3. 左侧菜单找到 **Pages**
4. **Source** 选择 **GitHub Actions**
5. 保存设置

### 3. 自动部署

推送代码后，GitHub Actions 会自动：
- ✅ 安装依赖
- ✅ 构建项目
- ✅ 部署到 GitHub Pages

查看部署状态：
- 仓库页面 → **Actions** 标签
- 等待绿色✅表示部署成功

### 4. 访问网站

部署成功后，访问：
```
https://YOUR_USERNAME.github.io/zen-particles-3d/
```

## 🔧 本地部署测试

```bash
# 安装 gh-pages 工具
npm install

# 构建并部署
npm run deploy
```

## 📝 注意事项

### 摄像头权限
- GitHub Pages 使用 HTTPS，支持摄像头访问
- 首次访问需要允许摄像头权限

### 自定义域名（可选）
如果有自己的域名：
1. 在仓库根目录创建 `public/CNAME` 文件
2. 写入你的域名，如：`particles.yourdomain.com`
3. 在域名DNS设置中添加CNAME记录指向 `YOUR_USERNAME.github.io`

## 🌐 国内访问

✅ **GitHub Pages 在国内可以直接访问**
- 无需代理
- 访问速度稳定
- 完全免费

## 🎮 使用说明

部署后的网站功能：
- ❤️ 5000个粒子组成的3D爱心
- 👌 双手捏合手势控制缩放
- 🎨 多种形状和颜色选择
- 📱 响应式设计，支持移动端

## 🐛 故障排除

### 部署失败
- 检查 GitHub Actions 日志
- 确保 `package.json` 中依赖完整
- 确认 Node 版本兼容（建议 20+）

### 页面空白
- 检查浏览器控制台错误
- 确认 `vite.config.ts` 中 base 路径正确
- 清除浏览器缓存重试

### 摄像头无法访问
- 确保使用 HTTPS 访问
- 检查浏览器权限设置
- 尝试其他浏览器（推荐 Chrome/Edge）

## 📞 技术支持

遇到问题？
1. 查看 GitHub Actions 构建日志
2. 检查浏览器开发者工具控制台
3. 确认网络连接正常

---

**祝部署顺利！享受3D粒子特效吧！** ✨
