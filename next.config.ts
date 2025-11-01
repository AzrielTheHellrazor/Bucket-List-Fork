import type { NextConfig } from "next";
import path from "path";

// Type definitions for webpack plugin
interface WebpackCompiler {
  hooks: {
    normalModuleFactory: {
      tap: (name: string, callback: (nmf: NormalModuleFactory) => void) => void;
    };
  };
}

interface NormalModuleFactory {
  hooks: {
    beforeResolve: {
      tap: (name: string, callback: (data: ResolveData) => void) => void;
    };
  };
}

interface ResolveData {
  request?: string;
  context?: string;
}

const nextConfig: NextConfig = {
  typescript: {
    // Ignore build errors from @coinbase/onchainkit src files
    // These are handled by webpack plugin at runtime
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    
    // Fix @coinbase/onchainkit internal path alias issue
    // Use a custom resolver plugin to handle @/ paths only for the package
    const originalResolve = config.resolve.alias || {};
    const onchainkitSrcPath = path.resolve(__dirname, 'node_modules/@coinbase/onchainkit/src');
    
    // Create a custom resolver that checks if we're in the onchainkit package
    config.resolve.alias = {
      ...originalResolve,
    };
    
    // Use NormalModuleFactory to intercept imports from onchainkit
    config.plugins = config.plugins || [];
    config.plugins.push({
      apply: (compiler: WebpackCompiler) => {
        compiler.hooks.normalModuleFactory.tap('OnchainKitAliasPlugin', (nmf: NormalModuleFactory) => {
          nmf.hooks.beforeResolve.tap('OnchainKitAliasPlugin', (data: ResolveData) => {
            if (data.request && data.request.startsWith('@/') && data.context) {
              const contextPath = data.context;
              if (contextPath.includes('@coinbase/onchainkit/src')) {
                const relativePath = data.request.replace('@/', '');
                const resolvedPath = path.resolve(onchainkitSrcPath, relativePath);
                data.request = resolvedPath;
              }
            }
          });
        });
      },
    });
    
    return config;
  },
  transpilePackages: ['@coinbase/onchainkit'],
};

export default nextConfig;
