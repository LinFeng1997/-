import { DomSanitizer } from '@angular/platform-browser'
import { Pipe, PipeTransform } from '@angular/core';
import { AppConfig } from "../app/app.config";

/*
 * modify by Blow on 2017-03-08.
 * 界面上处理Url标记的管道
*/
@Pipe({ name: 'safeUrl'})
export class SafeUrlPipe implements PipeTransform  {
  
  constructor(private sanitized: DomSanitizer, protected cfg: AppConfig) {
        if (AppConfig.debug)
            console.log(`${cfg.config.logTAG}ctox SafeUrlPipe Provider`);
  }

  transform(value: string) {
        if (AppConfig.debug)
            if (value)
                console.log(`${this.cfg.config.logTAG}传入了需要被信任处理的Url标记:${value}`)
            
        return this.sanitized.bypassSecurityTrustUrl(value);
  }
}