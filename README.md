# HTML Inspector

## 快速开始

```javascript

npm i

node src/index.js https://example.com 

```

## 插件系统

### 内置插件

1. **404检测插件**
   - 检测页面是否返回404状态
   - 分析页面内容中的404特征

2. **白屏检测插件**
   - 检测页面是否为空白
   - 分析页面背景和内容

3. **资源大小检测插件**
   - 监控页面资源大小
   - 可配置资源大小限制

4. **UI对比插件**
   - 支持页面截图对比
   - 可设置相似度阈值

## API 文档

### Inspector 类

```javascript
new Inspector(options)
```

参数：

- `options.timeout`: 页面加载超时时间（默认：30000ms）
- `options.viewport`: 浏览器视口设置

### 检测方法

```javascript
inspector.inspect(url, token)

```

参数：

- `url`: 待检测页面URL
- `token`: 认证token

返回值：

- `Promise<Array>`: 检测结果数组

## 配置项

在 `src/config/constants.js` 中定义了默认配置：

```javascript
export const DEFAULT_TIMEOUT = 30000;
export const DEFAULT_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB
export const DEFAULT_SIMILARITY_THRESHOLD = 0.95;
```

## 测试

运行测试：

```bash
npm test
```

测试覆盖率要求：

- 分支覆盖率：80%
- 函数覆盖率：80%
- 行覆盖率：80%

## 项目结构

```
src/
├── core/           # 核心功能
├── plugins/        # 检测插件
├── utils/          # 工具类
├── config/         # 配置文件
└── index.js        # 入口文件

tests/              # 测试文件
```

## 开发指南

1. 克隆仓库
2. 安装依赖：`npm install`
3. 运行测试：`npm test`
4. 提交代码前确保测试通过

## 注意事项

- 确保提供正确的认证token
- 合理配置资源大小限制
- 注意页面加载超时设置
