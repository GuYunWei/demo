import Mock from 'mockjs';
import { remoteUrl as URL } from "../Constant/interface";

var data = Mock.mock(/login/, {
    'list|1-10': [{
        'id|+1': 1
    }]
})
export { data }