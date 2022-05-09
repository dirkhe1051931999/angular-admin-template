export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(`${moduleName} 已经加载。仅在 AppModule 中导入核心模块。`);
  }
}
