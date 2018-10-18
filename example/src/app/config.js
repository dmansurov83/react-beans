import { bean } from '../../../src';
import { profile } from '../../../src/beans';
import { debug } from 'util';

export const CONFIG = "config";

class Config {
    api = 'http://';
    configValue = 'Deus vult';
}

@bean(CONFIG)
@profile('debug')
class DebugConfig extends Config{
    api = 'http://debug' 
}

@bean(CONFIG)
class ReleaseConfig extends Config{
    api = 'http://release'
}