import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import prettierConfig from 'eslint-config-prettier';

import tseslint from 'typescript-eslint';
import typescriptParser from '@typescript-eslint/parser';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';

import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

import babelParser from '@babel/eslint-parser';

// 定义针对 TypeScript 文件的特定配置
const tsConfig = [
  {
    name: 'typescript-eslint config',
    languageOptions: {
      parser: typescriptParser, // 指定解析 TypeScript 文件所使用的解析器为 tsEslintParser
      sourceType: 'module',
      ecmaVersion: 2020,
      // parserOptions: {
      //   project: "./tsconfig.json", // 如果需要项目配置
      // },
    },
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tsEslintPlugin, // 注册 '@typescript-eslint' 插件，使其规则和功能在后续 ESLint 检查中可用
    },
    rules: {
      ...tsEslintPlugin.configs.recommended.rules, // 合并 @typescript-eslint/eslint-plugin 推荐配置中的规则
      '@typescript-eslint/no-confusing-non-null-assertion': 'error', // 禁止使用容易造成混淆的非空断言操作符
      '@typescript-eslint/no-explicit-any': 'off', // 允许在代码中使用 any 类型
    },
  },
];

const flatConfig = [
  /** ignore */
  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      'public',
      '.gitignore',
      'package.json',
      'package-lock.json',
      '.npmrc',
      '*.d.ts',
      'src/assets/**',
    ],
  },

  /** 全局变量配置 */
  {
    name: 'Global Config',
    languageOptions: {
      globals: {
        ...globals.es2022,
        ...globals.browser,
        ...globals.node,
      },
      // 配置解析器支持的语法相关的选项
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false, // 不针对不支持的 TypeScript 版本发出警告
      },
    },
    rules: {},
  },

  /** 通用 js配置 */
  {
    // files
    files: ['src/**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    languageOptions: {
      // 合并'pluginJs' 插件推荐配置中的语言选项相关配置
      ...pluginJs.configs.recommended.languageOptions,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
    },
  },

  /** eslint react配置 */
  {
    name: 'React Config',
    files: ['/**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      react: pluginReact,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh, // 代码热更新
    },
    languageOptions: {
      // 合并'react' 插件推荐配置中的语言选项相关配置，例如设置支持的 JSX 相关语法等
      ...pluginReact.configs.recommended.languageOptions,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      // in tsconfig.json config is "jsx": "react-jsx" // 对于 React 17+ 引入的新的 JSX 转换方式
      ...pluginReact.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
    },
    settings: {
      // 设置 React 版本为自动检测，让 ESLint 相关插件根据项目实际使用的 React 版本来应用合适的规则和检查逻辑
      react: {
        version: 'detect',
      },
    },
  },

  {
    name: 'babel-parser',
    languageOptions: {
      parser: babelParser, // 指定使用 babelParser 作为解析器，以支持解析经过 Babel 处理的代码语法
      // 配置解析器支持的语法相关的详细选项
      parserOptions: {
        babelOptions: {
          babelrc: false, // 不使用项目中的.babelrc 文件来配置 Babel
          configFile: false, // 不使用单独的配置文件来配置 Babel
          browserslistConfigFile: false, // 不使用 browserslist 配置文件（通常与 Babel 针对不同浏览器兼容性处理相关）
          presets: ['@babel/preset-env'], // 指定使用的 Babel 预设，这里使用 '@babel/preset-env'，它可以根据目标环境自动转换 ES 新特性语法为兼容的旧语法
        },
        requireConfigFile: false, // 不要求必须有配置文件来进行解析器相关配置
      },
    },
  },
  /** prettier配置 */
  {
    name: 'prettier config',
    files: ['**/*.{js,jsx,ts,tsx}'],
    ...eslintPluginPrettierRecommended,
    rules: {
      ...eslintPluginPrettierRecommended.rules,
      'prettier/prettier': [
        'error',
        {},
        {
          usePrettierrc: true, // 使用配置文件
        },
      ],
    },
  },
  /**解决prettier和eslint冲突 */
  prettierConfig,
];

export default tseslint.config(...tsConfig, ...flatConfig);
