import { DomSanitizer } from '@angular/platform-browser'
import { Pipe, PipeTransform } from '@angular/core';
import { AppConfig } from "../app/app.config";

/*
 * modify by Blow on 2017-03-08.
 * 界面上处理Script标记的管道
*/
@Pipe({ name: 'safeScript'})
export class SafeScriptPipe implements PipeTransform  {
  
  constructor(private sanitized: DomSanitizer, protected cfg: AppConfig) {
        if (AppConfig.debug)
            console.log(`${cfg.config.logTAG}ctox SafeScriptPipe Provider`);
  }

  transform(value: string) {
        if (AppConfig.debug)
            if (value)
                console.log(`${this.cfg.config.logTAG}传入了需要被信任处理的Script标记:${value}`)
            
        return this.sanitized.bypassSecurityTrustScript(value);
  }
}