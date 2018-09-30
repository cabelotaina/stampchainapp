import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class PointProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(point: Point) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        console.log('Formated date: '+new Date());
        console.log('New point: '+JSON.stringify(point, null, 1));
        let sql = 'insert into points (timestamp, latitude, longitude, type) values (?, ?, ?, ?)';
        let data = [point.timestamp, point.latitude, point.longitude, point.type];

        return db.executeSql(sql, data)
          .catch((e) => console.error(JSON.stringify(e, null, 1)));
      })
      .catch((e) => console.error(JSON.stringify(e, null, 1)));
  }

  public update(point: Point) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update points set timestamp = ?, latitude = ?, longitude = ?, type = ?';
        let data = [point.timestamp, point.latitude, point.longitude, point.type];

        return db.executeSql(sql, data)
          .catch((e) => console.error(JSON.stringify(e, null, 1)));
      })
      .catch((e) => console.error(JSON.stringify(e, null, 1)));
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from points where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(JSON.stringify(e, null, 1)));
      })
      .catch((e) => console.error(JSON.stringify(e, null, 1)));
  }

  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from points where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let point = new Point();
              point.id = item.id;
              point.timestamp = item.timestamp;
              point.latitude = item.latitude;
              point.longitude = item.longitude;
              point.type = item.type;

              return point;
            }

            return null;
          })
          .catch((e) => console.error(JSON.stringify(e, null, 1)));
      })
      .catch((e) => console.error(JSON.stringify(e, null, 1)));
  }

  public getAll() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * from points';
        var data: any[];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let points: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var point = data.rows.item(i);
                // point.timestamp = new Date(parseInt(point.timestamp));
                points.push(point);
              }
              return points;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(JSON.stringify(e, null, 1)));
      })
      .catch((e) => console.error(JSON.stringify(e, null, 1)));
  }


  public reset() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'DELETE FROM points; VACUUM;';

        return db.executeSql(sql)
          .catch((e) => console.error(JSON.stringify(e, null, 1)));
      })
      .catch((e) => console.error(JSON.stringify(e, null, 1)));
  }

  public getFakePoints() {
    return [ { id:1, timestamp:1535669469449, latitude:'-27.6827618939285', longitude:'-48.4911178642813', type:'Foreground' }, { id:2, timestamp:1535669573693, latitude:'-27.6830887142827', longitude:'-48.4908731561606', type:'Background' }, { id:3, timestamp:1535669638918, latitude:'-27.6829317631458', longitude:'-48.4908918478047', type:'Background' }, { id:4, timestamp:1535669708664, latitude:'-27.6828322699551', longitude:'-48.4908464178895', type:'Background' }, { id:5, timestamp:1535669796971, latitude:'-27.6829694398005', longitude:'-48.4911767486935', type:'Foreground' }, { id:6, timestamp:1535669851099, latitude:'-27.6829694398005', longitude:'-48.4911767486935', type:'Foreground' }, { id:7, timestamp:1535669881788, latitude:'-27.6829694398005', longitude:'-48.4911767486935', type:'Foreground' }, { id:8, timestamp:1535669936710, latitude:'-27.6829694398005', longitude:'-48.4911767486935', type:'Foreground' }, { id:9, timestamp:1535670044845, latitude:'-27.6829694398005', longitude:'-48.4911767486935', type:'Foreground' }, { id:10, timestamp:1535670084808, latitude:'-27.6829694398005', longitude:'-48.4911767486935', type:'Foreground' }, { id:11, timestamp:1535670133995, latitude:'-27.6829694398005', longitude:'-48.4911767486935', type:'Foreground' }, { id:12, timestamp:1535670151929, latitude:'-27.6829694398005', longitude:'-48.4911767486935', type:'Foreground' }, { id:13, timestamp:1535670170932, latitude:'-27.6829694398005', longitude:'-48.4911767486935', type:'Foreground' }, { id:14, timestamp:1535670264199, latitude:'-27.6829694398005', longitude:'-48.4911767486935', type:'Foreground' }, { id:15, timestamp:1535670301672, latitude:'-27.6829307573174', longitude:'-48.4911433048998', type:'Foreground' }, { id:16, timestamp:1535670320256, latitude:'-27.6829307573174', longitude:'-48.4911433048998', type:'Foreground' }, { id:17, timestamp:1535670344791, latitude:'-27.682929835308', longitude:'-48.4911429696237', type:'Foreground' }, { id:18, timestamp:1535670369716, latitude:'-27.6829259377231', longitude:'-48.4911407065098', type:'Foreground' }, { id:19, timestamp:1535670456623, latitude:'-27.6829259377231', longitude:'-48.4911407065098', type:'Foreground' }, { id:20, timestamp:1535670633617, latitude:'-27.6829058211555', longitude:'-48.491127882198', type:'Foreground' }, { id:21, timestamp:1535670677451, latitude:'-27.6829058211555', longitude:'-48.491127882198', type:'Foreground' }, { id:22, timestamp:1535670710247, latitude:'-27.6829058211555', longitude:'-48.491127882198', type:'Foreground' }, { id:23, timestamp:1535670724856, latitude:'-27.6829022588466', longitude:'-48.4911290556644', type:'Foreground' }, { id:24, timestamp:1535670788271, latitude:'-27.6829022588466', longitude:'-48.4911290556644', type:'Foreground' }, { id:25, timestamp:1535671295931, latitude:'-27.68295736986', longitude:'-48.4912594780778', type:'Background' }, { id:26, timestamp:1535673079556, latitude:'-27.6827660624352', longitude:'-48.4910974781183', type:'Foreground' }, { id:27, timestamp:1535674556787, latitude:'-27.6829631114636', longitude:'-48.491159817249', type:'Background' }, { id:28, timestamp:1535674622368, latitude:'-27.6829121914019', longitude:'-48.4911486693178', type:'Foreground' }, { id:29, timestamp:1535674715506, latitude:'-27.6859580840665', longitude:'-48.4902534638629', type:'Foreground' }, { id:30, timestamp:1535674838061, latitude:'-27.6829444198196', longitude:'-48.4911531117265', type:'Background' }, { id:31, timestamp:1535675329433, latitude:'-27.6829665061344', longitude:'-48.4911574703162', type:'Background' }, { id:32, timestamp:1535675425242, latitude:'-27.6817604340871', longitude:'-48.4929190949057', type:'Foreground' }, { id:33, timestamp:1535675518279, latitude:'-27.681713956434', longitude:'-48.4928321745698', type:'Foreground' }, { id:34, timestamp:1535676080297, latitude:'-27.6829945436005', longitude:'-48.4911858849679', type:'Background' }, { id:35, timestamp:1535676149412, latitude:'-27.6830220781525', longitude:'-48.4912035707836', type:'Background' }, { id:36, timestamp:1535676911416, latitude:'-27.6817009005439', longitude:'-48.4927944676883', type:'Foreground' }, { id:37, timestamp:1535677055320, latitude:'-27.6817040238787', longitude:'-48.4928164165919', type:'Background' }, { id:38, timestamp:1535678483738, latitude:'-27.6817040238787', longitude:'-48.4928164165919', type:'Background' }, { id:39, timestamp:1535678533183, latitude:'-27.6816865476106', longitude:'-48.4928269777899', type:'Foreground' }, { id:40, timestamp:1535678682394, latitude:'-27.6817794610073', longitude:'-48.4928864893024', type:'Foreground' }, { id:41, timestamp:1535678850078, latitude:'-27.6818128628914', longitude:'-48.4929214418386', type:'Background' }, { id:42, timestamp:1535679571741, latitude:'-27.6816741177587', longitude:'-48.4929031725477', type:'Foreground' }, { id:43, timestamp:1535679644353, latitude:'-27.6817277027552', longitude:'-48.4928637743448', type:'Background' }, { id:44, timestamp:1535679774511, latitude:'-27.6817740965892', longitude:'-48.492882717446', type:'Foreground' }, { id:45, timestamp:1535679836344, latitude:'-27.6817116095011', longitude:'-48.4928358626072', type:'Foreground' }, { id:46, timestamp:1535679900283, latitude:'-27.6821125159298', longitude:'-48.492174614266', type:'Foreground' }, { id:47, timestamp:1535680498011, latitude:'-27.6817277027552', longitude:'-48.4928637743448', type:'Background' }, { id:48, timestamp:1535680559310, latitude:'-27.6885456266139', longitude:'-48.4976651799385', type:'Foreground' }, { id:49, timestamp:1535680622370, latitude:'-27.6890535699461', longitude:'-48.4974565543686', type:'Foreground' }, { id:50, timestamp:1535680686276, latitude:'-27.6895307936032', longitude:'-48.4967564139967', type:'Foreground' }, { id:51, timestamp:1535681051656, latitude:'-27.6924220059532', longitude:'-48.4945187733678', type:'Foreground' }, { id:52, timestamp:1535681130210, latitude:'-27.6926643261944', longitude:'-48.4941660706406', type:'Foreground' }, { id:53, timestamp:1535681190218, latitude:'-27.692704182144', longitude:'-48.4939943254446', type:'Foreground' }, { id:54, timestamp:1535681307934, latitude:'-27.6924220059532', longitude:'-48.4945187733678', type:'Background' }, { id:55, timestamp:1535681442271, latitude:'-27.6929280627777', longitude:'-48.494328595743', type:'Background' }, { id:56, timestamp:1535681596093, latitude:'-27.6928723231216', longitude:'-48.4942396637504', type:'Foreground' }, { id:57, timestamp:1535682095766, latitude:'-27.6927961316218', longitude:'-48.4942549188142', type:'Background' }, { id:58, timestamp:1535682542426, latitude:'-27.6927621849139', longitude:'-48.494220217735', type:'Background' }, { id:59, timestamp:1535715330584, latitude:'-27.6931422423141', longitude:'-48.4944567739302', type:'Foreground' }, { id:60, timestamp:1535715425774, latitude:'-27.6930131457433', longitude:'-48.4943623627266', type:'Background' }, { id:61, timestamp:1535715521533, latitude:'-27.692845710579', longitude:'-48.4943635482793', type:'Background' }, { id:62, timestamp:1535717950572, latitude:'-27.6930224430074', longitude:'-48.494362710089', type:'Background' }, { id:63, timestamp:1535718034300, latitude:'-27.6930339681242', longitude:'-48.4943228960489', type:'Background' }, { id:64, timestamp:1535718103237, latitude:'-27.6929089101289', longitude:'-48.4943001810913', type:'Foreground' }, { id:65, timestamp:1535718165326, latitude:'-27.6927134022375', longitude:'-48.4943837486659', type:'Foreground' }, { id:66, timestamp:1535718226226, latitude:'-27.692858953986', longitude:'-48.494283584923', type:'Foreground' }, { id:67, timestamp:1535719116273, latitude:'-27.6929958723743', longitude:'-48.4941943176542', type:'Background' }, { id:68, timestamp:1535719177303, latitude:'-27.6867480017503', longitude:'-48.4934487473671', type:'Foreground' }, { id:69, timestamp:1535719238301, latitude:'-27.6863371627663', longitude:'-48.4932313207989', type:'Foreground' }, { id:70, timestamp:1535719300265, latitude:'-27.6857617870231', longitude:'-48.4929451626246', type:'Foreground' }, { id:71, timestamp:1535719749334, latitude:'-27.6927109714855', longitude:'-48.4943187889163', type:'Background' }, { id:72, timestamp:1535719847659, latitude:'-27.6827795058747', longitude:'-48.4911075979923', type:'Foreground' }, { id:73, timestamp:1535719918439, latitude:'-27.6828724192713', longitude:'-48.491191417024', type:'Foreground' }, { id:74, timestamp:1535720518510, latitude:'-27.6827802300177', longitude:'-48.4911018670381', type:'Foreground' } , { "id": 1, "timestamp": "1538261469449.0", "latitude": "-27.6827618939285", "longitude": "-48.4911178642813", "type": "Foreground" }, { "id": 2, "timestamp": "1538261573693.0", "latitude": "-27.6830887142827", "longitude": "-48.4908731561606", "type": "Background" }, { "id": 3, "timestamp": "1538261638918.0", "latitude": "-27.6829317631458", "longitude": "-48.4908918478047", "type": "Background" }, { "id": 4, "timestamp": "1538261708664.0", "latitude": "-27.6828322699551", "longitude": "-48.4908464178895", "type": "Background" }, { "id": 5, "timestamp": "1538261796971.0", "latitude": "-27.6829694398005", "longitude": "-48.4911767486935", "type": "Foreground" }, { "id": 6, "timestamp": "1538261851099.0", "latitude": "-27.6829694398005", "longitude": "-48.4911767486935", "type": "Foreground" }, { "id": 7, "timestamp": "1538261881788.0", "latitude": "-27.6829694398005", "longitude": "-48.4911767486935", "type": "Foreground" }, { "id": 8, "timestamp": "1538261936710.0", "latitude": "-27.6829694398005", "longitude": "-48.4911767486935", "type": "Foreground" }, { "id": 9, "timestamp": "1538262044845.0", "latitude": "-27.6829694398005", "longitude": "-48.4911767486935", "type": "Foreground" }, { "id": 10, "timestamp": "1538262084808.0", "latitude": "-27.6829694398005", "longitude": "-48.4911767486935", "type": "Foreground" }, { "id": 11, "timestamp": "1538262133995.0", "latitude": "-27.6829694398005", "longitude": "-48.4911767486935", "type": "Foreground" }, { "id": 12, "timestamp": "1538262151929.0", "latitude": "-27.6829694398005", "longitude": "-48.4911767486935", "type": "Foreground" }, { "id": 13, "timestamp": "1538262170932.0", "latitude": "-27.6829694398005", "longitude": "-48.4911767486935", "type": "Foreground" }, { "id": 14, "timestamp": "1538262264199.0", "latitude": "-27.6829694398005", "longitude": "-48.4911767486935", "type": "Foreground" }, { "id": 15, "timestamp": "1538262301672.0", "latitude": "-27.6829307573174", "longitude": "-48.4911433048998", "type": "Foreground" }, { "id": 16, "timestamp": "1538262320256.0", "latitude": "-27.6829307573174", "longitude": "-48.4911433048998", "type": "Foreground" }, { "id": 17, "timestamp": "1538262344791.0", "latitude": "-27.682929835308", "longitude": "-48.4911429696237", "type": "Foreground" }, { "id": 18, "timestamp": "1538262369716.0", "latitude": "-27.6829259377231", "longitude": "-48.4911407065098", "type": "Foreground" }, { "id": 19, "timestamp": "1538262456623.0", "latitude": "-27.6829259377231", "longitude": "-48.4911407065098", "type": "Foreground" }, { "id": 20, "timestamp": "1538262633617.0", "latitude": "-27.6829058211555", "longitude": "-48.491127882198", "type": "Foreground" }, { "id": 21, "timestamp": "1538262677451.0", "latitude": "-27.6829058211555", "longitude": "-48.491127882198", "type": "Foreground" }, { "id": 22, "timestamp": "1538262710247.0", "latitude": "-27.6829058211555", "longitude": "-48.491127882198", "type": "Foreground" }, { "id": 23, "timestamp": "1538262724856.0", "latitude": "-27.6829022588466", "longitude": "-48.4911290556644", "type": "Foreground" }, { "id": 24, "timestamp": "1538262788271.0", "latitude": "-27.6829022588466", "longitude": "-48.4911290556644", "type": "Foreground" }, { "id": 25, "timestamp": "1538263295931.0", "latitude": "-27.68295736986", "longitude": "-48.4912594780778", "type": "Background" }, { "id": 26, "timestamp": "1538265079556.0", "latitude": "-27.6827660624352", "longitude": "-48.4910974781183", "type": "Foreground" }, { "id": 27, "timestamp": "1538266556787.0", "latitude": "-27.6829631114636", "longitude": "-48.491159817249", "type": "Background" }, { "id": 28, "timestamp": "1538266622368.0", "latitude": "-27.6829121914019", "longitude": "-48.4911486693178", "type": "Foreground" }, { "id": 29, "timestamp": "1538266715506.0", "latitude": "-27.6859580840665", "longitude": "-48.4902534638629", "type": "Foreground" }, { "id": 30, "timestamp": "1538266838061.0", "latitude": "-27.6829444198196", "longitude": "-48.4911531117265", "type": "Background" }, { "id": 31, "timestamp": "1538267329433.0", "latitude": "-27.6829665061344", "longitude": "-48.4911574703162", "type": "Background" }, { "id": 32, "timestamp": "1538267425242.0", "latitude": "-27.6817604340871", "longitude": "-48.4929190949057", "type": "Foreground" }, { "id": 33, "timestamp": "1538267518279.0", "latitude": "-27.681713956434", "longitude": "-48.4928321745698", "type": "Foreground" }, { "id": 34, "timestamp": "1538268080297.0", "latitude": "-27.6829945436005", "longitude": "-48.4911858849679", "type": "Background" }, { "id": 35, "timestamp": "1538268149412.0", "latitude": "-27.6830220781525", "longitude": "-48.4912035707836", "type": "Background" }, { "id": 36, "timestamp": "1538268911416.0", "latitude": "-27.6817009005439", "longitude": "-48.4927944676883", "type": "Foreground" }, { "id": 37, "timestamp": "1538269055320.0", "latitude": "-27.6817040238787", "longitude": "-48.4928164165919", "type": "Background" }, { "id": 38, "timestamp": "1538270483738.0", "latitude": "-27.6817040238787", "longitude": "-48.4928164165919", "type": "Background" }, { "id": 39, "timestamp": "1538270533183.0", "latitude": "-27.6816865476106", "longitude": "-48.4928269777899", "type": "Foreground" }, { "id": 40, "timestamp": "1538270682394.0", "latitude": "-27.6817794610073", "longitude": "-48.4928864893024", "type": "Foreground" }, { "id": 41, "timestamp": "1538270850078.0", "latitude": "-27.6818128628914", "longitude": "-48.4929214418386", "type": "Background" }, { "id": 42, "timestamp": "1538271571741.0", "latitude": "-27.6816741177587", "longitude": "-48.4929031725477", "type": "Foreground" }, { "id": 43, "timestamp": "1538271644353.0", "latitude": "-27.6817277027552", "longitude": "-48.4928637743448", "type": "Background" }, { "id": 44, "timestamp": "1538271774511.0", "latitude": "-27.6817740965892", "longitude": "-48.492882717446", "type": "Foreground" }, { "id": 45, "timestamp": "1538271836344.0", "latitude": "-27.6817116095011", "longitude": "-48.4928358626072", "type": "Foreground" }, { "id": 46, "timestamp": "1538271900283.0", "latitude": "-27.6821125159298", "longitude": "-48.492174614266", "type": "Foreground" }, { "id": 47, "timestamp": "1538272498011.0", "latitude": "-27.6817277027552", "longitude": "-48.4928637743448", "type": "Background" }, { "id": 48, "timestamp": "1538272559310.0", "latitude": "-27.6885456266139", "longitude": "-48.4976651799385", "type": "Foreground" }, { "id": 49, "timestamp": "1538272622370.0", "latitude": "-27.6890535699461", "longitude": "-48.4974565543686", "type": "Foreground" }, { "id": 50, "timestamp": "1538272686276.0", "latitude": "-27.6895307936032", "longitude": "-48.4967564139967", "type": "Foreground" }, { "id": 51, "timestamp": "1538273051656.0", "latitude": "-27.6924220059532", "longitude": "-48.4945187733678", "type": "Foreground" }, { "id": 52, "timestamp": "1538273130210.0", "latitude": "-27.6926643261944", "longitude": "-48.4941660706406", "type": "Foreground" }, { "id": 53, "timestamp": "1538273190218.0", "latitude": "-27.692704182144", "longitude": "-48.4939943254446", "type": "Foreground" }, { "id": 54, "timestamp": "1538273307934.0", "latitude": "-27.6924220059532", "longitude": "-48.4945187733678", "type": "Background" }, { "id": 55, "timestamp": "1538273442271.0", "latitude": "-27.6929280627777", "longitude": "-48.494328595743", "type": "Background" }, { "id": 56, "timestamp": "1538273596093.0", "latitude": "-27.6928723231216", "longitude": "-48.4942396637504", "type": "Foreground" }, { "id": 57, "timestamp": "1538274095766.0", "latitude": "-27.6927961316218", "longitude": "-48.4942549188142", "type": "Background" }, { "id": 58, "timestamp": "1538274542426.0", "latitude": "-27.6927621849139", "longitude": "-48.494220217735", "type": "Background" }, { "id": 59, "timestamp": "1538307330584.0", "latitude": "-27.6931422423141", "longitude": "-48.4944567739302", "type": "Foreground" }, { "id": 60, "timestamp": "1538307425774.0", "latitude": "-27.6930131457433", "longitude": "-48.4943623627266", "type": "Background" }, { "id": 61, "timestamp": "1538307521533.0", "latitude": "-27.692845710579", "longitude": "-48.4943635482793", "type": "Background" }, { "id": 62, "timestamp": "1538309950572.0", "latitude": "-27.6930224430074", "longitude": "-48.494362710089", "type": "Background" }, { "id": 63, "timestamp": "1538310034300.0", "latitude": "-27.6930339681242", "longitude": "-48.4943228960489", "type": "Background" }, { "id": 64, "timestamp": "1538310103237.0", "latitude": "-27.6929089101289", "longitude": "-48.4943001810913", "type": "Foreground" }, { "id": 65, "timestamp": "1538310165326.0", "latitude": "-27.6927134022375", "longitude": "-48.4943837486659", "type": "Foreground" }, { "id": 66, "timestamp": "1538310226226.0", "latitude": "-27.692858953986", "longitude": "-48.494283584923", "type": "Foreground" }, { "id": 67, "timestamp": "1538311116273.0", "latitude": "-27.6929958723743", "longitude": "-48.4941943176542", "type": "Background" }, { "id": 68, "timestamp": "1538311177303.0", "latitude": "-27.6867480017503", "longitude": "-48.4934487473671", "type": "Foreground" }, { "id": 69, "timestamp": "1538311238301.0", "latitude": "-27.6863371627663", "longitude": "-48.4932313207989", "type": "Foreground" }, { "id": 70, "timestamp": "1538311300265.0", "latitude": "-27.6857617870231", "longitude": "-48.4929451626246", "type": "Foreground" }, { "id": 71, "timestamp": "1538311749334.0", "latitude": "-27.6927109714855", "longitude": "-48.4943187889163", "type": "Background" }, { "id": 72, "timestamp": "1538311847659.0", "latitude": "-27.6827795058747", "longitude": "-48.4911075979923", "type": "Foreground" }, { "id": 73, "timestamp": "1538311918439.0", "latitude": "-27.6828724192713", "longitude": "-48.491191417024", "type": "Foreground" }, { "id": 74, "timestamp": "1538312518510.0", "latitude": "-27.6827802300177", "longitude": "-48.4911018670381", "type": "Foreground" } ];
  }
}

export class Point {
  id: Number;
  timestamp: Number;
  latitude: Number;
  longitude: Number;
  type: String;
}
