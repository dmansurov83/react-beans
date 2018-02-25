import { bean } from '../../../src';
import { profile } from '../../../src/beans';
import { debug } from 'util';

class Config {
    api = 'http://'
    configValue = 'Deus vult'
}

@bean('config')
@profile('debug')
class DebugConfig extends Config{
    api = 'http://debug' 
}

@bean('config')
class ReleaseConfig extends Config{
    api = 'http://release'
}