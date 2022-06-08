import { Process } from "./Process"

export interface ProcessResult{
    process: Process,
    code: string,
    message: string,    
    success: boolean,    
    data?: any
}