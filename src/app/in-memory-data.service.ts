import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService{
    // lấy dữ liệu
    createDb(){
        const heroes = [
            { id: 11, name: 'HuyHoang'},
            { id: 12, name: 'NhatLing'},
            { id: 13, name: 'VuPhong'},
            { id: 14, name: 'Richart'},
            { id: 15, name: 'JohnCock'},
            { id: 16, name: 'MinhHieu'},
            { id: 17, name: 'HoangHuy'},
            { id: 18, name: 'TuânnhA'},

        ];
        return{heroes};
    }
}
//tạo tệp này để thay thế tệp mock-heroes.ts