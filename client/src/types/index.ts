export type ModuleType=  {_id:string, title:string, description:string, videoUrl:string, branchId:string, sequence:number, mdxContent: string}

export type UserType = { _id: string; hashedPassword: string; email: string; role: string; created: Date; branchId: string; completedModulesId: string[]; currentModuleVideoTime: number; progressPercentage: number, currentModuleId:string }