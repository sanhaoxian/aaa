export default  {
  hostGroup: {
    api: '/api/v1/setting/hostgroup',
    operating: {
      add: true,
      delete: true,
      save: true,
    },
    cols: [
      {
        type: "checkbox",
        align: "center"
      },
      {
        field: "Name",
        title: vm.$t('Table.hostGroup.tableTH[0]'),
        width: "10%",
        align: "center",
        edit: "text"
      },
      {
        field: "Hosts",
        title: vm.$t('Table.hostGroup.tableTH[1]'),
        width: "70%",
        align: "center",
        event: "extendHosts"
      },
      {
        field: "bgEdit",
        title: vm.$t('Table.hostGroup.tableTH[2]'),
        Width: "20%",
        align: "center",
        style: "cursor:pointer",
        templet() {
          return `<i class="glyphicon glyphicon-edit" aria-hidden="true"></i>`
        }
      },
    ],
    laypage: {
      limit: 10,
      theme: "#36a1f2",
      first: vm.$t('laypage[0]'),
      layout: ['prev', 'page', 'next', 'skip', 'count'],
      last: vm.$t('laypage[1]'),
      prev: "<em>"+vm.$t('laypage[2]')+"</em>",
      next: "<em>"+vm.$t('laypage[3]')+"</em>",
    },
    format: function (data) {
      let res = [];
      $.each(data, (i, e) => {
        let devices = [];
        $.each(e.Hosts, (j, k) => {
          devices.push(k.Name);
        })
        res.push({
          Id: e.Id,
          Name: e.Name,
          Hosts: devices
        })
      });
      return res;
    },
    editType: "null",
    editOpts(number) {
      return {
        id: new Date().valueOf(),
        Name: vm.$t('Table.Box.Add.hostGroup.data') + Number(number + 1),
        Hosts: null,
        edit: 'add'
      }
    },
    submitFile(edit, obj) {
      let data = {};
      if (edit == 'create') {
        return data = {
          Name: obj.Name
        }
      }
      if (edit == 'delete') {
        return data = {
          id: obj.Id
        }
      }
      if (edit == 'update') {
        return data = {
          Id: obj.Id,
          Name: obj.Name
        }
      }
    },
    onSubmit(edit) {
      return '/api/v1/setting/hostgroup/' + edit
    }
  },
  devices: {
    api: '/api/v1/setting/host',
    select: true,
    operating: {
      add: true,
      delete: true,
      save: true,
      management: true
    },
    cols: [
      {
        type: "checkbox",
        align: "center"
      },
      {
        field: "Name",
        title: vm.$t('Table.devices.tableTH[0]'),
        align: "center",
        edit: "text"
      },
      {
        field: "Hostgroups",
        title: vm.$t('Table.devices.tableTH[1]'),
        align: "center",
        templet(d) {
          let res = '',
            temp = '';
          if (d.hgList) {
            for (let i = 0; i < d.hgList.length; i++) {
              if (d.Hostgroups) {
                if(d.Hostgroups.length>0){
                  if (d.hgList[i].Id == d.Hostgroups[0].Id) {
                    temp = `<option value="${d.hgList[i].Id}">${d.hgList[i].Name}</option>`;
                  } else {
                    res += `<option value="${d.hgList[i].Id}">${d.hgList[i].Name}</option>`
                  }
                }
              } else {
                if (d.hgList[i].Id == d.hostgroups[0]) {
                  temp = `<option value="${d.hgList[i].Id}">${d.hgList[i].Name}</option>`;
                } else {
                  res += `<option value="${d.hgList[i].Id}">${d.hgList[i].Name}</option>`
                }
              }
            }
          }
          if (temp) {
            res = temp + res;
          }
          return `
              <div class="layui-input-block">
                  <select name="Hostgroups" lay-filter="sel">
                      ${res}
                  </select>
              </div>
          `
        },
        event: "selectChange"
      },
      {
        field: "Contactgroups",
        title: vm.$t('Table.devices.tableTH[2]'),
        align: "center",
        templet(d) {
          let res = "";
          if(d.Contactgroups){
            $.each(d.contactsList, (i, b)=>{
              $.each(d.Contactgroups, (j, k)=>{
                if(k.Id==b.Id){
                  res += b.Name+' ';
                }
              });
            });
            return `<span>${res}<i class="glyphicon glyphicon-edit" aria-hidden="true"></i></span>`
          }
          if(d.contact_groups){
            $.each(d.contactsList, (i, b)=>{
              $.each(d.contact_groups, (j, k)=>{
                if(k==b.Id){
                  res += b.Name+' ';
                }
              });
            });
            return `<span>${res}<i class="glyphicon glyphicon-edit" aria-hidden="true"></i></span>`
          }
          
        },
        style: "cursor: pointer",
        event: 'setContactgroups',
      },
      {
        field: "_SUB_GROUP",
        title: vm.$t('Table.devices.tableTH[3]'),
        align: "center",
        edit: "text"
      },
      {
        field: "_DRIVER",
        title: vm.$t('Table.devices.tableTH[4]'),
        align: "center"
      },
      {
        field: "Address",
        title: vm.$t('Table.devices.tableTH[5]'),
        align: "center",
        edit: "text"
      },
      {
        field: "_PORT",
        title: vm.$t('Table.devices.tableTH[6]'),
        align: "center",
        edit: "text"
      },
      {
        field: "_RS485_ADDR",
        title: vm.$t('Table.devices.tableTH[7]'),
        align: "center",
        edit: "text"
      },
      {
        field: "_PASSIVE_ENABLED",
        title: vm.$t('Table.devices.tableTH[8]'),
        align: "center",
        templet(d) {
          let res;
          if(d._PASSIVE_ENABLED=='1'){
            res = `<input type="checkbox" name=""  lay-skin="primary" checked>`
          }else{
            res = `<input type="checkbox" name=""  lay-skin="primary" >`
          }
          return res;
        },
        event: "passive_enabled"
      },
      {
        field: "_PASSIVE_REGISTRATION",
        title: vm.$t('Table.devices.tableTH[9]'),
        align: "center"
      },
      {
        field: "Monitor",
        title: vm.$t('Table.devices.tableTH[10]'),
        align: "center",
        event: "monitoring",
        style: 'cursor: pointer',
        templet() {
          return `<i class="glyphicon glyphicon-edit" aria-hidden="true"></i>`
        }
      },
      {
        field: "More",
        title: vm.$t('Table.devices.tableTH[11]'),
        align: "center",
        style: "cursor: pointer",
        event: "deviceMore",
        templet() {
          return `<i class="glyphicon glyphicon-edit" aria-hidden="true"></i>`
        }
      }
    ],
    laypage: {
      limit: 10,
      theme: "#36a1f2",
      first: vm.$t('laypage[0]'),
      last: vm.$t('laypage[1]'),
      layout: ['prev', 'page', 'next', 'skip', 'count'],
      prev: "<em>"+vm.$t('laypage[2]')+"</em>",
      next: "<em>"+vm.$t('laypage[3]')+"</em>",
    },
    format: function (datas, hgList, contactsList) {
      let data = datas.hosts ? datas.hosts : datas,
        res = [];
      $.each(data, (i, e) => {
        e.hgList = hgList;
        e.contactsList = contactsList;
      });
      return data;
    },
    editType: "box",
    editOpts: '',
    editContactGroups: function (d, contactsList) {
      let res = '';
      if(d.Contactgroups!=undefined){
        $.each(contactsList, (i, e)=>{
          res += `<input type='checkbox' name='${e.Name}' lay-skin='primary' value='${e.Id}' title='${e.Name}' ${e.Id&&d.Contactgroups.find(item=>Number(item.Id)===Number(e.Id))?'checked':''}/>`
        })
      }else{
        if(d.contact_groups!=undefined){
          $.each(contactsList, (i, e)=>{
            res += `<input type='checkbox' name='${e.Name}' lay-skin='primary' value='${e.Id}' title='${e.Name}' ${e.Id&&d.contact_groups.find(item=>item==e.Id)?'checked':''}/>`
          })
        }
      }
      return [vm.$t('Table.Box.Cell.device.editContactGroups_title'), res];
    },
    editMore: function (d, timeSlot, timeBase) {
      var code1, code2;
      for (let i = 0; i < timeSlot.length; i++) {
        code1 += '<option value=' + timeSlot[i].Id + ' ' + (d.CheckPeriod == timeSlot[i].Id ? "selected" : "") + '>' + timeSlot[i].Name + '</option>';
        code2 += '<option value=' + timeSlot[i].Id + ' ' + (d.NotificationPeriod == timeSlot[i].Id ? "selected" : "") + '>' + timeSlot[i].Name + '</option>';
      }
      function timeChange(t) {
        var h,m,code="";
        if(t>60){
            h=parseInt(t/3600);
            m=parseInt((t-3600*h)/60);
            h=h==0?"":h + vm.$t("Table.Box.Cell.device.more.unit[2]");
            code="&nbsp;&nbsp;&nbsp;&nbsp;("+h+m+vm.$t("Table.Box.Cell.device.more.unit[3]")+")";
        }
        $(".timeA").html(code);
        return code;
      }
      var time = timeChange(d.NotificationInterval * timeBase);
      let res = `
          <div class="layui-form-item">
              <label class="layui-form-label">${vm.$t('Table.Box.Cell.device.more.label[0]')}</label>
              <div class="layui-input-inline">
                  <input type="number" name="CheckInterval" step=${timeBase} min=${timeBase}
                  value="${ Number(d.CheckInterval * timeBase) }" autocomplete="off" class="layui-input">
              </div>
              <span>${vm.$t('Table.Box.Cell.device.more.unit[0]')}</span>
          </div>
          <div class="layui-form-item">
              <label class="layui-form-label">${vm.$t('Table.Box.Cell.device.more.label[1]')}</label>
              <div class="layui-input-inline">
                  <input type="number" min="1" name="MaxCheckAttempts"  value="${d.MaxCheckAttempts}" autocomplete="off" class="layui-input">
              </div>
              <span>${vm.$t('Table.Box.Cell.device.more.unit[1]')}</span>
          </div>
          <div class="layui-form-item">
              <label class="layui-form-label">${vm.$t('Table.Box.Cell.device.more.label[2]')}</label>
              <div class="layui-input-inline">
                  <select name="CheckPeriod">
                      ${ code1 }
                  </select>
              </div>
          </div>
          <div class="layui-form-item">
              <label class="layui-form-label">${vm.$t('Table.Box.Cell.device.more.label[3]')}</label>
              <div class="layui-input-inline">
                  <select name="NotificationPeriod">
                      ${ code2 }
                  </select>
              </div>
          </div>
          <div class="layui-form-item">
              <label class="layui-form-label">${vm.$t('Table.Box.Cell.device.more.label[4]')}</label>
              <div class="layui-input-inline">
                  <input type="number" step=${timeBase} min=${timeBase} name="NotificationInterval" value="${ Number(d.NotificationInterval * timeBase) }" autocomplete="off" class="layui-input" />
              </div>
              <span>${vm.$t('Table.Box.Cell.device.more.unit[0]')}</span>
              <span class="timeA">${time}</span>
          </div>
          <div class="layui-form-item">
              <label class="layui-form-label">${vm.$t('Table.Box.Cell.device.more.label[5]')}</label>
              <div class="layui-input-block">
                  <input type="checkbox" value="true" name="NotificationsEnabled" title="ON" ${d.NotificationsEnabled ? 'checked' : ''}>
              </div>
          </div>
      `;
      res += d._ZIGBEE_ENABLED ? `
        <div class="layui-form-item">
            <label class="layui-form-label">${vm.$t('Table.Box.Cell.device.more.label[6]')}</label>
            <div class="layui-input-block">
                <input type="checkbox" value="true" name="_ZIGBEE_ENABLED" title="ON" ${d.NotificationsEnabled ? 'checked' : ''}>
            </div>
        </div>
      `: ''
      res += d._ZIGBEE_ENABLED ? `
        <div class="layui-form-item">
            <label class="layui-form-label">${vm.$t('Table.Box.Cell.device.more.label[7]')}</label>
            <div class="layui-input-inline">
                <input type="text" value="${ d._ZIGBEE_64BIT_ADDR }" name="_ZIGBEE_64BIT_ADDR" autocomplete="off" class="layui-input">
            </div>
        </div>
      ` : '';
      res += d._MAX_BUFFERED_MSG ? `
        <div class="layui-form-item">
            <label class="layui-form-label">${vm.$t('Table.Box.Cell.device.more.label[8]')}</label>
            <div class="layui-input-inline">
                <input type="text" value="${ d._MAX_BUFFERED_MSG }" name="_MAX_BUFFERED_MSG" autocomplete="off" class="layui-input">
            </div>
        </div>
      ` : '';
      res += d._VERSION ? `
        <div class="layui-form-item">
            <label class="layui-form-label">${vm.$t('Table.Box.Cell.device.more.label[9]')}</label>
            <div class="layui-input-inline">
                <input type="text" value="${ d._VERSION }" name="_VERSION" autocomplete="off" class="layui-input">
            </div>
        </div>
      ` : '';
      res += d._SNMP_COMMUNITY ? `
        <div class="layui-form-item">
            <label class="layui-form-label">${vm.$t('Table.Box.Cell.device.more.label[10]')}</label>
            <div class="layui-input-inline">
                <input type="text" value="${ d._SNMP_COMMUNITY }" name="_SNMP_COMMUNITY" autocomplete="off" class="layui-input">
            </div>
        </div>
      ` : '';
      res += d._SNMP_VER ? `
        <div class="layui-form-item">
            <label class="layui-form-label">${vm.$t('Table.Box.Cell.device.more.label[11]')}</label>
            <div class="layui-input-inline">
                <input type="text" value="${ d._SNMP_VER }" name="_SNMP_VER" autocomplete="off" class="layui-input">
            </div>
        </div>
      ` : '';
      res += d._SNMP_TIMEOUT ? `
        <div class="layui-form-item">
            <label class="layui-form-label">${vm.$t('Table.Box.Cell.device.more.label[12]')}</label>
            <div class="layui-input-inline">
                <input type="text" value="${ d._SNMP_TIMEOUT }" name="_SNMP_TIMEOUT" autocomplete="off" class="layui-input">
            </div>
        </div>
      ` : '';

      return res = [vm.$t('Table.Box.Cell.device.more.title'), res];
    },
    submitFile(edit, obj) {
      let data = {};
      if (edit == 'delete') {
        return data = {
          id: obj.Id
        }
      }
      if (edit == 'update') {
        return data = obj;
      }
      if (edit == 'create') {
        return data = obj;
      }
    },
    onSubmit(edit) {
      if (edit == 'update'){
        return '/api/v1/setting/host/update'
      }
      if (edit == 'create'){
        return '/config/rest/Hosts'
      }
      if (edit == 'delete'){
        return '/api/v1/setting/host/delete'
      }
    }
  },
  monitoring: {
    api:'/api/v1/setting/service',
    select: true,
    operating: {
      delete: true,
      save: true,
      management: true,
    },
    cols: [
        {
        type: "checkbox",
        align: "center"
      },
      {
        field: "Description",
        title: vm.$t('Table.monitoring.tableTH[0]'),
        align: "center",
        edit: "text"
      },
      {
        field: "Contactgroups",
        title: vm.$t('Table.monitoring.tableTH[1]'),
        align: "center",
        templet(d) {
          let res = "";
          $.each(d.Contactgroups, (i, e) => {
            res += e.Name + ' ';
          })
          return `<span>${res}<i class="glyphicon glyphicon-edit" aria-hidden="true"></i></span>`
        },
        style: "cursor: pointer",
        event: 'setContactgroups',
      },
      {
        field: "_ITEM_NAME",
        title: vm.$t('Table.monitoring.tableTH[2]'),
        align: "center",
      },
      {
        field: "CheckCommandParameters",
        title: vm.$t('Table.monitoring.tableTH[3]'),
        align: "center",
        templet(d) {
          let res = '';
          for(let i=0; i<d.CheckCommandParameters.length; i++){
            res += d.CheckCommandParameters[i]+"!"
          }
          return 'ped!'+ res +`<i class="glyphicon glyphicon-edit" aria-hidden="true"></i>`
        },
        style: "cursor: pointer",
        event: "checkOrder"
      },
      {
        field: "Host",
        title: vm.$t('Table.monitoring.tableTH[4]'),
        align: "center",
      },
      {
        field: "bgEdit",
        title: vm.$t('Table.monitoring.tableTH[5]'),
        align: "center",
        width: "10%",
        style: "cursor:pointer",
        templet() {
          return `<i class="glyphicon glyphicon-edit" aria-hidden="true"></i>`
        },
        event: 'serverMore',
      },
    ],
    format: function (datas) {
      let data = datas.services ? datas.services : datas,
        res = [];
        return data;
    },
    editContactGroups: function (d, contactsList) {
        let res = '';
        if(d.Contactgroups!=undefined){
          $.each(contactsList, (i, e)=>{
            res += `<input type='checkbox' name='${e.Name}' lay-skin='primary' value='${e.Id}' title='${e.Name}' ${e.Id&&d.Contactgroups.find(item=>Number(item.Id)===Number(e.Id))?'checked':''}/>`
          })
        }else{
          if(d.contact_groups!=undefined){
            $.each(contactsList, (i, e)=>{
              res += `<input type='checkbox' name='${e.Name}' lay-skin='primary' value='${e.Id}' title='${e.Name}' ${e.Id&&d.contact_groups.find(item=>item==e.Id)?'checked':''}/>`
            })
          }
        }
        // return [vm.$t('Table.Box.Cell.device.editContactGroups_title'), res];
      return [vm.$t('Table.Box.Cell.monitoring.editContactGroups_title'), res];
    },
    editMore: function (d, timeSlot, timeBase) {
      var code1, code2;
      for (let i = 0; i < timeSlot.length; i++) {
        code1 += '<option value=' + timeSlot[i].Id + ' ' + (d.CheckPeriod == timeSlot[i].Id ? "selected" : "") + '>' + timeSlot[i].Name + '</option>';
        code2 += '<option value=' + timeSlot[i].Id + ' ' + (d.NotificationPeriod == timeSlot[i].Id ? "selected" : "") + '>' + timeSlot[i].Name + '</option>';
      }
      let res = `
          <div class="layui-form-item">
              <label class="layui-form-label">${vm.$t('Table.Box.Cell.monitoring.more.label[0]')}</label>
              <div class="layui-input-inline">
                  <input type="number" name="NormalCheckInterval" step=${timeBase} min=${timeBase} 
                  value="${ d.NormalCheckInterval * timeBase}" placeholder="请输入" autocomplete="off" class="layui-input">
              </div>
              <span>${vm.$t('Table.Box.Cell.monitoring.more.unit[0]')}</span>
          </div>
          <div class="layui-form-item">
              <label class="layui-form-label">${vm.$t('Table.Box.Cell.monitoring.more.label[1]')}</label>
              <div class="layui-input-inline">
                  <input type="number" min="1" name="MaxCheckAttempts" placeholder="请输入" value="${d.MaxCheckAttempts}" autocomplete="off" class="layui-input">
              </div>
              <span>${vm.$t('Table.Box.Cell.monitoring.more.unit[1]')}</span>
          </div>
          <div class="layui-form-item">
              <label class="layui-form-label">${vm.$t('Table.Box.Cell.monitoring.more.label[2]')}</label>
              <div class="layui-input-inline">
                  <select name="CheckPeriod">
                      ${ code1 }
                  </select>
              </div>
          </div>
          <div class="layui-form-item">
              <label class="layui-form-label">${vm.$t('Table.Box.Cell.monitoring.more.label[3]')}</label>
              <div class="layui-input-inline">
                  <select name="NotificationPeriod">
                      ${ code2 }
                  </select>
              </div>
          </div>
          <div class="layui-form-item">
              <label class="layui-form-label">${vm.$t('Table.Box.Cell.monitoring.more.label[4]')}</label>
              <div class="layui-input-inline">
                  <input type="number" step=${timeBase} min=${timeBase} name="NotificationInterval" placeholder="请输入" value="${ Number(d.NotificationInterval * timeBase) }" autocomplete="off" class="layui-input" />
              </div>
              <span>${vm.$t('Table.Box.Cell.monitoring.more.unit[0]')}</span>
          </div>
          <div class="layui-form-item">
              <label class="layui-form-label">${vm.$t('Table.Box.Cell.monitoring.more.label[5]')}</label>
              <div class="layui-input-block">
                  <input type="checkbox" value="true" name="NotificationsEnabled" title="ON" ${d.NotificationsEnabled ? 'checked' : ''}>
              </div>
          </div>
      `;
      res += d._ZIGBEE_ENABLED ? `
        <div class="layui-form-item">
            <label class="layui-form-label">${vm.$t('Table.Box.Cell.monitoring.more.label[6]')}</label>
            <div class="layui-input-block">
                <input type="checkbox" value="true" name="_ZIGBEE_ENABLED" title="ON" ${d.NotificationsEnabled ? 'checked' : ''}>
            </div>
        </div>
      `: ''
      res += d._ZIGBEE_ENABLED ? `
        <div class="layui-form-item">
            <label class="layui-form-label">${vm.$t('Table.Box.Cell.monitoring.more.label[7]')}</label>
            <div class="layui-input-inline">
                <input type="text" value="${ d._ZIGBEE_64BIT_ADDR }" name="_ZIGBEE_64BIT_ADDR" placeholder="请输入" autocomplete="off" class="layui-input">
            </div>
        </div>
      ` : '';
      res += d._MAX_BUFFERED_MSG ? `
        <div class="layui-form-item">
            <label class="layui-form-label">${vm.$t('Table.Box.Cell.monitoring.more.label[8]')}</label>
            <div class="layui-input-inline">
                <input type="text" value="${ d._MAX_BUFFERED_MSG }" name="_MAX_BUFFERED_MSG" placeholder="请输入" autocomplete="off" class="layui-input">
            </div>
        </div>
      ` : '';
      res += d._VERSION ? `
        <div class="layui-form-item">
            <label class="layui-form-label">${vm.$t('Table.Box.Cell.monitoring.more.label[9]')}</label>
            <div class="layui-input-inline">
                <input type="text" value="${ d._VERSION }" name="_VERSION" placeholder="请输入" autocomplete="off" class="layui-input">
            </div>
        </div>
      ` : '';
      res += d._SNMP_COMMUNITY ? `
        <div class="layui-form-item">
            <label class="layui-form-label">${vm.$t('Table.Box.Cell.monitoring.more.label[10]')}</label>
            <div class="layui-input-inline">
                <input type="text" value="${ d._SNMP_COMMUNITY }" name="_SNMP_COMMUNITY" placeholder="请输入" autocomplete="off" class="layui-input">
            </div>
        </div>
      ` : '';
      res += d._SNMP_VER ? `
        <div class="layui-form-item">
            <label class="layui-form-label">${vm.$t('Table.Box.Cell.monitoring.more.label[11]')}</label>
            <div class="layui-input-inline">
                <input type="text" value="${ d._SNMP_VER }" name="_SNMP_VER" placeholder="请输入" autocomplete="off" class="layui-input">
            </div>
        </div>
      ` : '';
      res += d._SNMP_TIMEOUT ? `
        <div class="layui-form-item">
            <label class="layui-form-label">${vm.$t('Table.Box.Cell.monitoring.more.label[12]')}</label>
            <div class="layui-input-inline">
                <input type="text" value="${ d._SNMP_TIMEOUT }" name="_SNMP_TIMEOUT" placeholder="请输入" autocomplete="off" class="layui-input">
            </div>
        </div>
      ` : '';

      return res = [vm.$t('Table.Box.Cell.monitoring.more.title'), res];
    },
    editCheckOrder: function(d) {
        let res = '';
        if(d.CheckCommandParameters[1]==undefined){
            if(d.CheckCommandParameters[0]!=undefined){
                let data = d.CheckCommandParameters[0].split(',');
                if(data.length==2){
                    res += `
                        <div class="layer_checkOrder_content" style="display: flex; flex-direction: column;">
                            <div class="layer_checkOrder_block" style="display: flex; flex-direction: column; justify-content: space-around;">
                                <p>${vm.$t('Table.Box.Cell.monitoring.editCheckOrder.label[0]')}</p>
                                <div style="display: flex; ">
                                    <div style="margin: 5px">
                                        <label>${vm.$t('Table.Box.Cell.monitoring.editCheckOrder.label2[0]')}:</label>
                                        <input style="border: 1px solid #ccc; border-radius: 3px; height: 30px; padding-left: 5px" type='text' name='min' lay-skin='primary' value='${data[0]}' title='${data[0]}' />
                                    </div>
                                    <div style="margin: 5px">
                                        <label>${vm.$t('Table.Box.Cell.monitoring.editCheckOrder.label2[1]')}:</label>
                                        <input style="border: 1px solid #ccc; border-radius: 3px; height: 30px; padding-left: 5px" type='text' name='max' lay-skin='primary' value='${data[1]}' title='${data[1]}' />
                                    </div>
                                    <i class="layui-icon layui-icon-close-fill layer_checkOrder_deleteBtn" style="cursor: pointer; color: red; font-size: 28px;"></i>
                                </div>
                            </div>
                        </div>
                    `
                }else{
                    res += `
                        <div class="layer_checkOrder_content" style="display: flex;flex-direction: column;">
                            <div class="layer_checkOrder_block" style="display: flex; flex-direction: column; justify-content: space-around;">
                                <p>${vm.$t('Table.Box.Cell.monitoring.editCheckOrder.label[0]')}</p>
                                <div style="display: flex">
                                    <div style="margin: 5px">
                                        <input style="border: 1px solid #ccc; border-radius: 3px; height: 30px; padding-left: 5px" type='text' name='CheckCommandParameters' lay-skin='primary' value='${data[0]}' title='${data[0]}' />
                                    </div>
                                    <i class=" layer_checkOrder_deleteBtn layui-icon layui-icon-close-fill" style="cursor: pointer; color: red; font-size: 28px;"></i>
                                </div>
                            </div>
                        </div>
                    `
                }
            }else{
                // <p>${vm.$t('Table.Box.Cell.monitoring.editCheckOrder.tips[0]')}</p>
                res +=`
                    <div class="layer_checkOrder_content" style="display: flex; flex-direction: column;">
                    </div>
                `
            }
        }else{
            // res += `
            //     <div style="display: flex; flex-direction: column; justify-content: flex-start;">
            //         <p>${vm.$t('Table.Box.Cell.monitoring.editCheckOrder.label[0]')}</p>
            //         <div style="margin: 5px 5px 5xp 0">
            //         <input style="border: 1px solid #ccc; border-radius: 3px; height: 30px; padding-left: 5px" type='text' name='firstLevel' lay-skin='primary' value='${d.CheckCommandParameters[0]}' title='${d.CheckCommandParameters[0]}' />
            //         </div>
            //         <p>${vm.$t('Table.Box.Cell.monitoring.editCheckOrder.label[1]')}</p>
            //         <div style="margin: 5px 5px 5xp 0">
            //         <input style="border: 1px solid #ccc; border-radius: 3px; height: 30px; padding-left: 5px" type='text' name='secondLevel' lay-skin='primary' value='${d.CheckCommandParameters[1]}' title='${d.CheckCommandParameters[1]}'/>
            //         </div>
            //     </div>
            // `
            console.log("数据", d.CheckCommandParameters);
            console.log("长度", d.CheckCommandParameters.length);
            console.log(d.CheckCommandParameters[0].indexOf(','));
            // <a class="layui-btn layui-btn-warm delete layer_checkOrder_deleteBtn" style="height: 24px;line-height: 24px;">删除</a>
            res += `
                <div class="layer_checkOrder_content" style="display: flex; flex-direction: column;">
            `
            for(let i=0; i<d.CheckCommandParameters.length; i++){
                if(d.CheckCommandParameters[i].indexOf(',')>=0){
                    let data = d.CheckCommandParameters[i].split(',');
                    res+=`
                        <div class="layer_checkOrder_block" style="display: flex; flex-direction: column; justify-content: space-around;">
                            <p>${i+1}${vm.$t('Table.Box.Cell.monitoring.editCheckOrder.label[1]')}</p>
                            <div style="display: flex">
                                <div style="margin: 5px">
                                    <label>${vm.$t('Table.Box.Cell.monitoring.editCheckOrder.label2[0]')}:</label>
                                    <input autocomplete="off"  style="border: 1px solid #ccc; border-radius: 3px; height: 30px; padding-left: 5px" type='text' name='min' lay-skin='primary' value='${data[0]}' title='${data[0]}' />
                                </div>
                                <div style="margin: 5px">
                                    <label>${vm.$t('Table.Box.Cell.monitoring.editCheckOrder.label2[1]')}:</label>
                                    <input autocomplete="off"  style="border: 1px solid #ccc; border-radius: 3px; height: 30px; padding-left: 5px" type='text' name='max' lay-skin='primary' value='${data[1]}' title='${data[1]}' />
                                </div>
                                <i class=" layer_checkOrder_deleteBtn layui-icon layui-icon-close-fill" style="cursor: pointer; color: red; font-size: 28px;"></i>
                            </div>
                        </div>
                    `
                }else{
                    res+=`
                        <div class="layer_checkOrder_block" style="display: flex; flex-direction: column; justify-content: space-around;">
                            <p>2级报警</p>
                            <div style="display: flex">
                                <div style="margin: 5px">
                                    <input style="border: 1px solid #ccc; border-radius: 3px; height: 30px; padding-left: 5px" type='text' name='CheckCommandParameters' autocomplete="off"  lay-skin='primary' value='${d.CheckCommandParameters[i]}' title='${d.CheckCommandParameters[i]}' />
                                </div>
                                <i class=" layer_checkOrder_deleteBtn layui-icon layui-icon-close-fill" style="cursor: pointer; color: red; font-size: 28px;"></i>
                            </div>
                        </div>
                    `
                }
            }
            res+='</div>'
      }
      
      
      return res = [vm.$t('Table.Box.Cell.monitoring.editCheckOrder.title'), res]
    },
    submitFile(edit, obj) {
      let data = {};
      if (edit == 'delete') {
        return data = {
          id: obj.Id
        }
      }
      if (edit == 'update') {
        return data = obj;
      }
    },
    onSubmit(edit) {
      if (edit == 'update'){
        return '/api/v1/setting/service/update'
      }
      if (edit == 'delete'){
        return '/api/v1/setting/service/delete'
      }
    }
  },
  user: {
    api:'/api/v1/user',
    operating: {
      add: true,
      delete: true,
      modify: true,
    },
    cols: [
      {
        type: "checkbox",
        align: "center"
      },
      {
        field: "Name",
        title: vm.$t('Table.user.tableTH[0]'),
        width: "10%",
        align: "center",
      },
      {
        field: "Type",
        title: vm.$t('Table.user.tableTH[1]'),
        width: "20%",
        align: "center",
        templet(d) {
          switch(d.Type){
            case '0': 
              return vm.$t('Table.user.data[0]');
              break;
            case '1': 
              return vm.$t('Table.user.data[1]');
              break;
            case '2': 
              return vm.$t('Table.user.data[2]');
              break
            default:
              return d.Type
              break;
          }
        }
      },
      {
        field: "HostGroups",
        title: vm.$t('Table.user.tableTH[2]'),
        Width: "20%",
        align: "center",
        templet(d) {
          let res = [];
          $.each(d.HostGroups, (i, e)=>{
            res += e.Name+', '
          }) 
          return res;
        }
      },
      {
        field: "ContactGroups",
        title: vm.$t('Table.user.tableTH[3]'),
        Width: "20%",
        align: "center",
        templet(d){
          let res = [];
          $.each(d.ContactGroups, (i, e)=>{
            res += e.Name+', '
          }) 
          return res;
        }
      }
    ],
    format(data) {
      return data;
    },
    submitFile(edit, data) {
      let feedback={
        status: true,
        msg: ""
      }
      let res, post={pwd:'',repwd:'',type:'',user:'',hostgroups:[],contactgroups:[]};
      if(edit=='add'){
        let pwd, repwd;
        $.each(data, (i,e)=>{
          if(e.name=='pwd'){pwd = e}
          if(e.name=="repwd"){repwd = e}
          e.name=='pwd'? post.pwd=e.value:' ',
          e.name=='repwd'? post.repwd=e.value: '',
          e.name=='Type'? post.type=e.value: '',
          e.name=='userName'? post.user=e.value: ''
          if(e.name=='host'){
            post.hostgroups.push({id: e.value})
          };
          if(e.name=='contact'){
            post.contactgroups.push({id: e.value})
          } 
        })

        if(pwd.value!=repwd.value){
            feedback.status = false;
            feedback.msg = vm.$t('Table.Box.Add.user.tips[0]')
        }
      }
      return res = {data: post, feedback};
    },
    onSubmit(edit) {
      return '/api/v1/user/'+ edit
    },
  },
  contactGroup: {
    api: '/api/v1/setting/contactgroup',
    operating: {
      add: true,
      delete: true,
      save: true
    },
    cols: [
      {
        type: "checkbox",
        align: "center"
      },
      {
        field: "Name",
        title: vm.$t('Table.contactGroup.tableTH[0]'),
        align: "center",
        edit: "text"
      },
      {
        field: "Contacts",
        title: vm.$t('Table.contactGroup.tableTH[1]'),
        align: "center",
        templet(d) {
          let res='';
          if(d.Contacts.length>0){
            $.each(d.Contacts, (i, e)=>{
              res += e.Name+', '
            });
          }else{
            return '';
          }
          return res;
        }
      },
    ],
    format: function (data) {
      let res = [];
      $.each(data, (i, e) => {
        res.push({
          Id: e.Id,
          Name: e.Name,
          Contacts: e.Contacts
        })
      });
      return res;
    },
    editType: 'null',
    editOpts(number) {
      return {
        id: new Date().valueOf(),
        Name: vm.$t('Table.Box.Add.contactGroup.data') + Number(number + 1),
        Contacts: '',
        edit: 'add'
      }
    },
    onSubmit(edit) { return '/api/v1/setting/contactgroup/'+edit },
    submitFile: function(edit, obj){
      let data = {};
      if (edit == 'create') {
        return data = {
          Name: obj.Name
        }
      }
      if (edit == 'delete') {
        return data = {
          id: obj.Id
        }
      }
      if (edit == 'update') {
        return data = {
          Id: obj.Id,
          Name: obj.Name
        }
      }
    }
  },
  contacts: {
    api: '/api/v1/setting/contact',
    operating: {
      add: true,
      delete: true,
      save: true,
      emailSet: true
    },
    cols: [
      {
        type: "checkbox",
        align: "center",
      },
      {
        field: "Name",
        title: vm.$t('Table.contacts.tableTH[0]'),
        align: "center",
        edit: "text"
      },
      {
        field: "ContactGroups",
        title: vm.$t('Table.contacts.tableTH[1]'),
        align: "center",
        templet(d) {
          let res='';
          if(d.ContactGroups){
            if(d.ContactGroups.length>0){
              $.each(d.ContactGroups, (i, e)=>{
                res += e.Name+','
              });
            }
          }else{
            return '<i class="glyphicon glyphicon-edit" aria-hidden="true"></i>';
          }
          return `<span>${res}</span><i class="glyphicon glyphicon-edit" aria-hidden="true"></i>`
        },
        event: 'setContactgroups',
        style: 'cursor: pointer'
      },
      {
        field: "Email",
        title: vm.$t('Table.contacts.tableTH[2]'),
        align: "center",
        edit: "text"
      },
      {
        field: "Address1",
        title: vm.$t('Table.contacts.tableTH[3]'),
        align: "center",
        edit: "text"
      },
      {
        field: "Address2",
        title: vm.$t('Table.contacts.tableTH[4]'),
        align: "center",
        edit: "text"
      },
      {
        field: "HostNotificationsEnabled",
        title: vm.$t('Table.contacts.tableTH[5]'),
        align: "center",
        width: "10%",
        style: "cursor:pointer",
        templet() {
          return `<i class="glyphicon glyphicon-edit" aria-hidden="true"></i>`
        },
        event: "timedNoti"
      },
      {
        field: "more",
        title: vm.$t('Table.contacts.tableTH[6]'),
        align: "center",
        width: "10%",
        style: "cursor:pointer",
        templet() {
          return `<i class="glyphicon glyphicon-edit" aria-hidden="true"></i>`
        },
        event: 'contactsMore'
      },
    ],
    editContactGroups: function (d, contactsList) {
      let res = '';
      if(d.ContactGroups!=undefined){
        $.each(contactsList, (i, e)=>{
          res += `<input type='checkbox' name='${e.Name}' lay-skin='primary' value='${e.Id}' title='${e.Name}' ${e.Id&&d.ContactGroups.find(item=>Number(item.Id)===Number(e.Id))?'checked':''}/>`
        })
      }else{
        $.each(contactsList, (i, e)=>{
          res += `<input type='checkbox' name='${e.Name}' lay-skin='primary' value='${e.Id}' title='${e.Name}'/>`
        })
      }
      return [vm.$t('Table.Box.Cell.contacts.editContactGroups_title'), res];
    },
    format: function (data) {
      return data;
    },
    editType: 'null',
    editOpts(number) {
      return {
        id: new Date().valueOf(),
        Name: vm.$t('Table.Box.Add.contacts.data') + Number(number + 1),
        edit: 'add',
        Address1: null,
        Address2: null,
        Address3: null,
        Address4: null,
        Address5: null,
        Address6: null,
        Alias: "",
        CanSubmitCommands: false,
        ContactGroups: [],
        Email: null,
        HostNotificationCommands: [],
        HostNotificationOnDown: true,
        HostNotificationOnFlapping: false,
        HostNotificationOnRecovery: true,
        HostNotificationOnScheduledDowntime: false,
        HostNotificationOnUnreachable: false,
        HostNotificationPeriod: 79,
        HostNotificationsEnabled: true,
        RetainNonstatusInformation: false,
        RetainStatusInformation: false,
        ServiceNotificationCommands: [],
        ServiceNotificationOnCritical: false,
        ServiceNotificationOnFlapping: false,
        ServiceNotificationOnRecovery: true,
        ServiceNotificationOnUnknown: false,
        ServiceNotificationOnWarning: true,
        ServiceNotificationPeriod: 79,
        ServiceNotificationsEnabled: true,
        _SMS_NOTIFY_ENABLE: "off",
        _SMS_NOTIFY_INTERVAL: "",
        _SMS_NOTIFY_TIME: ""
      }
    },
    editTimedNoti(d) {
      let res='';
      res +=`
        <div class="layui-form-item">
          <div class="layui-input-block" style="width: 50%">
            <input type="checkbox" name="_SMS_NOTIFY_ENABLE" title="${vm.$t('Table.Box.Cell.contacts.timedNoti.option[0]')}" lay-skin="primary" value="true" ${d._SMS_NOTIFY_ENABLE=="on"?'checked':''}>
          </div>
        </div>
        <div class="layui-form-item">
          <div class="layui-input-block" style="width: 50%">
            <input type="text" name="_SMS_NOTIFY_TIME" class="layui-input" id="sel1" value='${d._SMS_NOTIFY_TIME}' placeholder="HH:mm:ss">
          </div>
        </div>
        <div class="layui-form-item">
          <div class="layui-input-block" style="width: 50%">
            <select name="_SMS_NOTIFY_INTERVAL">
              <option value="1" ${d._SMS_NOTIFY_INTERVAL=="1"? 'selected':''}>${vm.$t('Table.Box.Cell.contacts.timedNoti.option[1]')}</option>
              <option value="2" ${d._SMS_NOTIFY_INTERVAL=="2"? 'selected':''}>${vm.$t('Table.Box.Cell.contacts.timedNoti.option[2]')}</option>
              <option value="3" ${d._SMS_NOTIFY_INTERVAL=="3"? 'selected':''}>${vm.$t('Table.Box.Cell.contacts.timedNoti.option[3]')}</option>
              <option value="4" ${d._SMS_NOTIFY_INTERVAL=="4"? 'selected':''}>${vm.$t('Table.Box.Cell.contacts.timedNoti.option[4]')}</option>
              <option value="5" ${d._SMS_NOTIFY_INTERVAL=="5"? 'selected':''}>${vm.$t('Table.Box.Cell.contacts.timedNoti.option[5]')}</option>
              <option value="6" ${d._SMS_NOTIFY_INTERVAL=="6"? 'selected':''}>${vm.$t('Table.Box.Cell.contacts.timedNoti.option[6]')}</option>
              <option value="7" ${d._SMS_NOTIFY_INTERVAL=="7"? 'selected':''}>${vm.$t('Table.Box.Cell.contacts.timedNoti.option[7]')}</option>
            </select> 
          </div>
        </div>
      `
      return res = [vm.$t('Table.Box.Cell.contacts.timedNoti.title'), res]
    },
    submitFile(type, data){
      if(type=='create'){
        if(data.ContactGroups.length>0){
          let ContactGroups = [];
          $.each(data.ContactGroups,(i,e)=>{
            ContactGroups.push(
              {Id: e.Id}
            );
          })
          data.ContactGroups = ContactGroups;
        }else{
          data.error = true;
          data.errMsg = "联系人组不能为空"
        }
        if(data.HostNotificationCommands.length<=0 || data.ServiceNotificationCommands.length<=0){
            data.error = true;
            data.errMsg = "更多参数中不能为空"
        }else{
            data.error = false;
            data.errMsg = "正常"
        };
        return data;
      }
      if(type=="delete"){
        return {id: data.Id}
      }
      return data;
    },
    onSubmit(edit) { return '/api/v1/setting/contact/'+edit }
  },
  period: {
    api: '/config/rest/Timeperiods',
    operating: {
      add: true,
      delete: true,
      save: true,
    },
    format(data){
      return data
    },
    cols: [
      {
        type: "checkbox",
        align: "center",
      },
      {
        field: "Name",
        title: vm.$t('Table.period.tableTH[0]'),
        align: "center",
        edit: 'text'
      },
      {
        field: "Alias",
        title: vm.$t('Table.period.tableTH[1]'),
        align: "center",
        edit: 'text'
      },
      {
        field: "monday",
        title: vm.$t('Table.period.tableTH[2]'),
        align: "center",
        templet(d) {
          return `<span style='display: inline-block; text-align: center; line-height: 26px; width: 25px; height: 25px; background: linear-gradient( #9de9fe,#1a85c2); border-radius: 50%;color: #fff'>
          <i class="glyphicon glyphicon-repeat" style='color: #fff'></i>
        </span>${d.monday?d.monday:''}`
        },
        event: 'setPeriod-monday',
        style: 'cursor: pointer'
      },
      {
        field: "tuesday",
        title: vm.$t('Table.period.tableTH[3]'),
        align: "center",
        templet(d) {
          return `<span style='display: inline-block; text-align: center; line-height: 26px; width: 25px; height: 25px; background: linear-gradient( #9de9fe,#1a85c2); border-radius: 50%;color: #fff'>
          <i class="glyphicon glyphicon-repeat" style='color: #fff'></i>
        </span>${d.tuesday?d.tuesday:''}`
        },
        event: 'setPeriod-tuesday',
        style: 'cursor: pointer'
      },
      {
        field: "wednesday",
        title: vm.$t('Table.period.tableTH[4]'),
        align: "center",
        templet(d) {
          return `<span style='display: inline-block; text-align: center; line-height: 26px; width: 25px; height: 25px; background: linear-gradient( #9de9fe,#1a85c2); border-radius: 50%;color: #fff'>
          <i class="glyphicon glyphicon-repeat" style='color: #fff'></i>
        </span>${d.wednesday?d.wednesday:''}`
        },
        event: 'setPeriod-wednesday',
        style: 'cursor: pointer'
      },
      {
        field: "thursday",
        title: vm.$t('Table.period.tableTH[5]'),
        align: "center",
        templet(d) {
          return `<span style='display: inline-block; text-align: center; line-height: 26px; width: 25px; height: 25px; background: linear-gradient( #9de9fe,#1a85c2); border-radius: 50%;color: #fff'>
          <i class="glyphicon glyphicon-repeat" style='color: #fff'></i>
        </span>${d.thursday?d.thursday:''}`
        },
        event: 'setPeriod-thursday',
        style: 'cursor: pointer'
      },
      {
        field: "friday",
        title: vm.$t('Table.period.tableTH[6]'),
        align: "center",
        templet(d) {
          return `<span style='display: inline-block; text-align: center; line-height: 26px; width: 25px; height: 25px; background: linear-gradient( #9de9fe,#1a85c2); border-radius: 50%;color: #fff'>
          <i class="glyphicon glyphicon-repeat" style='color: #fff'></i>
        </span>${d.friday?d.friday:''}`
        },
        event: 'setPeriod-friday',
        style: 'cursor: pointer'
      },
      {
        field: "saturday",
        title: vm.$t('Table.period.tableTH[7]'),
        align: "center",
        templet(d) {
          return `<span style='display: inline-block; text-align: center; line-height: 26px; width: 25px; height: 25px; background: linear-gradient( #9de9fe,#1a85c2); border-radius: 50%;color: #fff'>
          <i class="glyphicon glyphicon-repeat" style='color: #fff'></i>
        </span>${d.saturday?d.saturday:''}`
        },
        event: 'setPeriod-saturday',
        style: 'cursor: pointer'
      },
      {
        field: "sunday",
        title: vm.$t('Table.period.tableTH[8]'),
        align: "center",
        templet(d) {
          return `<span style='display: inline-block; text-align: center; line-height: 26px; width: 25px; height: 25px; background: linear-gradient( #9de9fe,#1a85c2); border-radius: 50%;color: #fff'>
            <i class="glyphicon glyphicon-repeat" style='color: #fff'></i>
          </span>${d.sunday?d.sunday:''}`
        },
        event: 'setPeriod-sunday',
        style: 'cursor: pointer'
      },
    ],
    editType: 'null',
    editOpts() {
      return {
        edit: 'add',
        Alias: '',
        id: new Date().valueOf(),
        Name: '',
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: ''
      }
    },
    submitFile(type, data){
      return data;
    },
    onSubmit(edit, id){
      if(edit=='create'){
        return '/config/rest/Timeperiods'
      }
      if(edit=='update'){
        return '/config/rest/Timeperiods/'+id
      }
      if(edit=='delete'){
        return '/config/rest/Timeperiods/'+id
      }
    }
  },
  ports: {
    api: '/config/rest/SerialPorts',
    operating: {
      save: true,
    },
    format(data){
      return data;
    },
    cols: [
      {
        type: "checkbox",
        align: "center",
      },
      {
        field: "Name",
        title: vm.$t('Table.ports.tableTH[0]'),
        align: "center",
      },
      {
        field: "Device",
        title: vm.$t('Table.ports.tableTH[1]'),
        align: "center",
      },
      {
        field: "Baudrate",
        title: vm.$t('Table.ports.tableTH[2]'),
        align: "center",
        templet(d) {
          let res = '', opts = [300,1200,2400,4800,9600,19200,38400,57600,115200];
          for(let i=0; i<opts.length; i++){
            if(opts[i]==Number(d.Baudrate)){
              res+='<option value="'+opts[i]+'" selected>'+opts[i]+'</option>'
            }else{
              res+='<option value="'+opts[i]+'">'+opts[i]+'</option>'
            }
          }
          return `
            <div class="layui-input-block">
              <select lay-filter="sel" name="Baudrate">
                ${res}
              </select>
            </div>
          `
        },
        event: 'selectChange'
      },
      {
        field: "DataBits",
        title: vm.$t('Table.ports.tableTH[3]'),
        align: "center",
        templet(d) {
          let res='', opts=[7,8];
          for(let i=0; i<opts.length; i++){
            if(opts[i]==Number(d.DataBits)){
              res+=`<option value='${opts[i]}' selected>${opts[i]}</option>`
            }else{
              res+=`<option value='${opts[i]}'>${opts[i]}</option>`
            }
          }
          return `
            <div class="layui-input-block">
              <select lay-filter="sel" name="DataBits"> 
                ${res}
              </select>
            </div>
          `
        },
        event: 'selectChange'
      },
      {
        field: "StopBits",
        title: vm.$t('Table.ports.tableTH[4]'),
        align: "center",
        templet(d) {
          let res='', opts=[1,2];
          for(let i=0; i<opts.length; i++){
            if(opts[i]==Number(d.StopBits)){
              res+=`<option value='${opts[i]}' selected>${opts[i]}</option>`
            }else{
              res+=`<option value='${opts[i]}'>${opts[i]}</option>`
            }
          }
          return `
            <div class="layui-input-block">
              <select lay-filter="sel" name="StopBits"> 
                ${res}
              </select>
            </div>
          `
        },
        event: 'selectChange'
      },
      {
        field: "Parity",
        title: vm.$t('Table.ports.tableTH[5]'),
        align: "center",
        templet(d) {
          let res = '', opts=[{val:'NONE',name: vm.$t('Table.ports.data[0]')},{val:'EVEN',name: vm.$t('Table.ports.data[1]')},{val:'ODD',name: vm.$t('Table.ports.data[2]')}];
          for(let i=0;i<opts.length;i++){
            if(opts[i].val==d.Parity){
              res+=`<option value='${opts[i].val}' selected>${opts[i].name}</option>`
            }else{
              res+=`<option value='${opts[i].val}'>${opts[i].name}</option>`
            }
          }
          return `
            <div class="layui-input-block">
                <select lay-filter="sel" name="Parity">
                  ${res}
                </select>
            </div>
            `
        },
        event: 'selectChange'
      },
      {
        field: "TcpPort",
        title: vm.$t('Table.ports.tableTH[6]'),
        align: "center",
      },
    ],
    submitFile(type,data) {
      return data;
    },
    onSubmit(edit, id) {
      if(edit=='update'){return ('/config/rest/SerialPorts/'+id)}
    }
  },
  leftMenu: {
    api: '/com/setting/extsmenu',
    operating: {
      add: true,
      delete: true,
      modify: true
    },
    format: function (datas, hgList) {
      let data = datas.hosts ? datas.hosts : datas,
        res = [];
      $.each(data, (i, e) => {
        e.hgList = hgList;
      });
      return data;
    },
    cols: [
      {
        type: "checkbox",
        align: "center",
      },
      {
        field: "Name",
        title: vm.$t('Table.leftMenu.tableTH[0]'),
        width: '12%',
        align: "center",
      },
      {
        field: "Hostgroup",
        title: vm.$t('Table.leftMenu.tableTH[1]'),
        width: '12%',
        align: "center",
        templet(d) {
          let val = d.hgList&&d.hgList.find(e=>{if(e.Id==d.Hostgroup){return e}});
          return val.Name
        }
      },
      {
        field: "Subgroup",
        title: vm.$t('Table.leftMenu.tableTH[2]'),
        align: "center",
        width: '10%'
      },
      {
        field: "Link",
        title: vm.$t('Table.leftMenu.tableTH[3]'),
        align: "center",
      },
      {
        field: "Target",
        title:  vm.$t('Table.leftMenu.tableTH[4]'),
        width: '12%',
        align: "center",
        templet(d) {
          if(d.Target=='main'){
            return vm.$t('Table.leftMenu.data[0]');
          }else if(d.Target=='_blank'){
            return vm.$t('Table.leftMenu.data[1]')
          }
        }
      },
    ],
    submitFile(type, data) {
      let post = {}, res;
      let feedback={
        status: true,
        msg: ""
      }
      for(let i=0;i<data.length;i++){
        post[data[i].name] = data[i].value
      }
      return res = {data: post, feedback};
    },
    onSubmit(edit, id) {
      return ('/api/v1/setting/extsmenu/'+ edit);
    }
  },
  timedTask: {
    api: '/config/rest/ControlTasks',
    editType: 'null',
    operating: {
      add: true,
      delete: true,
      save: true,
      test: true,
      compared: true,
      log: true,
    },
    format: function(data) {
      return data;
    },
    cols: [
      {
        type: "checkbox",
        align: "center",
      },
      {
        field: "Name",
        title: vm.$t('Table.timedTask.tableTH[0]'),
        width: '8%',
        align: "center",
        edit: "text"
      },
      {
        field: "CreatedBy",
        title: vm.$t('Table.timedTask.tableTH[1]'),
        width: '5%',
        align: "center",
      },
      {
        field: "ExecuteTime",
        title: vm.$t('Table.timedTask.tableTH[2]'),
        width: '10%',
        align: "center",
        edit: 'text'
      },
      {
        field: "Ids",
        title: vm.$t('Table.timedTask.tableTH[3]'),
        align: "center",
        width: "25%",
        templet(d) {
          let res = ''
          if(String(d.Repeat)=='true'){
            if(d.Monday){res+= vm.$t('Table.timedTask.data[0]')};
            if(d.Tuesday){res+= vm.$t('Table.timedTask.data[1]')};
            if(d.Wednesday){res+=vm.$t('Table.timedTask.data[2]')};
            if(d.Thursday){res+=vm.$t('Table.timedTask.data[3]')};
            if(d.Friday){res+= vm.$t('Table.timedTask.data[4]')};
            if(d.Saturday){res+=vm.$t('Table.timedTask.data[5]')};
            if(d.Sunday){res+=vm.$t('Table.timedTask.data[6]')};
          }else{
            res+=d.ExecuteDate;
          }
          return res+`<i class="glyphicon glyphicon-edit" aria-hidden="true"></i>`;
        },
        event: 'cycle',
        style: 'cursor: pointer'
      },
      {
        field: "LastExecutedBy",
        title: vm.$t('Table.timedTask.tableTH[4]'),
        width: '9%',
        align: "center",
      },
      {
        field: "LastFinishedStatus",
        title: vm.$t('Table.timedTask.tableTH[5]'),
        width: '9%',
        align: "center",
      },
      {
        field: "LastExecutedTime",
        title: vm.$t('Table.timedTask.tableTH[6]'),
        // width: '10%',
        align: "center",
      },
      {
        field: "Enabled",
        title: vm.$t('Table.timedTask.tableTH[7]'),
        width: '5%',
        align: "center",
        templet(d) {
          return `<input type="checkbox" id="${d.Id}" name="Enabled" value="true" lay-skin="primary" ${d.Enabled?'checked':''} lay-filter='timedTaskCheckbox'> `
        },
        event: 'timedTaskEnabled'
      },
      {
        field: "",
        title: vm.$t('Table.timedTask.tableTH[8]'),
        align: "center",
        width: '15%',
        style: "cursor:pointer",
        templet() {
          return `<i class="glyphicon glyphicon-edit" aria-hidden="true"></i>`
        },
        event: 'timedTaskOrder'
      },
    ],
    editOpts(number) {
        var D = new Date();
      return {
        id: new Date().valueOf(),
        Name: vm.$t('Table.timedTask.data[7]') + Number(number + 1),
        // Hosts: null,
        ExecuteDate: D.getFullYear()+"-"+(D.getMonth()+1)+'-'+D.getDate(),
        ExecuteTime: '00:00:00',
        // Ids: '',
        Enabled: false,
        // Monday: false,
        // Tuesday: false,
        // Wednesday: false,
        // Thursday: false,
        // Friday: false,
        // Saturday: false,
        // Sunday: false,
        Repeat: '',
        edit: 'add'
      }
    },
    submitFile(type, data) {
      return data
    },
    onSubmit(edit, id) {
      if(edit=='update'|| edit=='delete'){
        return ('/config/rest/ControlTasks/'+id);
      }
      return ('/config/rest/ControlTasks');
    }
  },
  forward: {
    api: '/api/v1/setting/apache/rule',
    editOpts(number) {
      return {
        id: new Date().valueOf(),
        Name: vm.$t('Table.forward.data[0]') + Number(number + 1),
        Type: "",
        Ip: "",
        Port: "",
        Number: "",
        edit: 'add'
      }
    },
    operating: {
      add: true,
      delete: true,
      save: true
    },
    format: function(data) {
      data = data.rows;
      return data;
    },
    select: true,
    cols: [
      {
        type: "checkbox",
        align: "center",
      },
      {
        field: "Name",
        title: vm.$t('Table.forward.tableTH[0]'),
        align: "center",
        event: 'forwardInput'
      },
      {
        field: "Type",
        title: vm.$t('Table.forward.tableTH[1]'),
        align: "center",
        templet(d) {
            let res
          return res=`
          <div class="layui-form-item">
            <div class="layui-input-block">
              <select name="Type" lay-filter="sel" style="width: 95%;height: 80%; border-radius: 2px; border: 1px solid #e6e6e6; padding:0 15px">
                <option value="0" ${0==d.Type?'selected':''}>门禁</option>
                <option value="1" ${1==d.Type?'selected':''}>视频</option>
              </select>
            </div>
          </div>
          `
        },
        event: 'selectChange'
      },
      {
        field: "Ip",
        title: vm.$t('Table.forward.tableTH[2]'),
        align: "center"
      },
      {
        field: "Port",
        title: vm.$t('Table.forward.tableTH[3]'),
        align: "center"
      },
      {
        field: "Number",
        title: vm.$t('Table.forward.tableTH[4]'),
        align: "center"
      },
    ],
    editAdd() {
      let res='';
      return res = `
      <div><form class="layui-form">
        <div class="layui-form-item">
          <label class="layui-form-label">${vm.$t('Table.Box.Add.forward.label[0]')}</label>
          <div class="layui-input-block">
            <input type="text" name="Name" placeholder="${vm.$t('Table.Box.Add.forward.placeholder[0]')}" autocomplete="off" class="layui-input">
          </div>
        </div>
        <div>
          <div class="layui-form-item">
            <label class="layui-form-label">${vm.$t('Table.Box.Add.forward.label[1]')}</label>
            <div class="layui-input-block">
              <select name="Type">
                <option value="0">${vm.$t('Table.Box.Add.forward.option[0]')}</option>
                <option value="1">${vm.$t('Table.Box.Add.forward.option[1]')}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label" style="width: 120px;">${vm.$t('Table.Box.Add.forward.label[2]')}</label>
          <div class="layui-input-block" style="margin-left: 120px;">
            <input type="text" name="Ip" placeholder="${vm.$t('Table.Box.Add.forward.placeholder[1]')}" autocomplete="off" class="layui-input">
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">${vm.$t('Table.Box.Add.forward.label[3]')}</label>
          <div class="layui-input-block">
            <input type="text" name="Port" placeholder="${vm.$t('Table.Box.Add.forward.placeholder[2]')}" autocomplete="off" class="layui-input">
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">${vm.$t('Table.Box.Add.forward.label[4]')}</label>
          <div class="layui-input-block">
            <input type="text" name="Number" placeholder="${vm.$t('Table.Box.Add.forward.placeholder[3]')}" autocomplete="off" class="layui-input">
          </div>
        </div>
        </form>
      </div>
      `
    },
    submitFile(type, data) {
      if(type=="add"){
        let post = {}, res;
        let feedback={
          status: true,
          msg: ""
        }
        for(let i=0;i<data.length;i++){
          post[data[i].name] = data[i].value
        }
        return res = {data: post, feedback};
      }else if(type=='delete'){
        return {id: data.Id}
      }else if(type=='update'){
        return data
      }
      
    },
    onSubmit(edit, id) {
      if(edit=='update'){
        return ('/api/v1/setting/apache/rule/'+ edit +'?id='+id);
      }
      return ('/api/v1/setting/apache/rule/'+ edit);
    }
  },
  linkage: {
    api: '/api/v1/linkage',
    operating: {
      add: true,
      delete: true,
      modify:true,
      application: true,
      batchEdit: true
    },
    format: function(data) {
      return data.linkages;
    },
    cols: [
      {
        type: "checkbox",
        align: "center",
      },
      {
        field: "Name",
        title: vm.$t('Table.linkage.tableTH[0]'),
        align: "center",
        event: 'forwardInput'
      },
      {
        field: "Host",
        title: vm.$t('Table.linkage.tableTH[1]'),
        align: "center",
        event: 'forwardInput'
      },
      {
        field: "Service",
        title: vm.$t('Table.linkage.tableTH[2]'),
        align: "center",
        event: 'forwardInput'
      },
      {
        field: "WorkValue",
        title: vm.$t('Table.linkage.tableTH[3]'),
        align: "center",
        event: 'forwardInput'
      },
      {
        field: "LimitValue",
        title: vm.$t('Table.linkage.tableTH[4]'),
        align: "center",
        event: 'forwardInput'
      },
      {
        field: "Remark",
        title: vm.$t('Table.linkage.tableTH[5]'),
        align: "center",
        event: 'forwardInput'
      },
      {
        field: "overlimit",
        title: vm.$t('Table.linkage.tableTH[6]'),
        align: "center",
        event: 'overrunOrder',
        templet() {
          return `<i class="glyphicon glyphicon-edit" aria-hidden="true"></i>`
        }
      },
      {
        field: "restore",
        title: vm.$t('Table.linkage.tableTH[7]'),
        align: "center",
        event: 'recoveryOrder',
        templet() {
          return `<i class="glyphicon glyphicon-edit" aria-hidden="true"></i>`
        }
      }
    ],
    editOverrun(arr) {
      let content = '';
      $.each(arr, (i, e)=>{
        let commandlist = e.RawCommand.split(" ")
        content += `
          <tr>
            <td>${e.Name}</td>
            <td>${e.host}</td>
            <td>${commandlist[commandlist.length-2]+" "+commandlist[commandlist.length-1]}</td>
          </tr>
        `
      })
      let res = `
      <table class="layui-table orderTable">
      <colgroup>
        <col width="30%">
        <col width="30%">
        <col width="30%">
      </colgroup>
      <thead>
        <tr>
          <th>名称</th>
          <th>设备</th>
          <th>命令</th>
        </tr> 
      </thead>
      <tbody>
        ${content}
      </tbody>
    </table>
      `
      return res=[vm.$t('mMore.linkage.prompt.title'), res]
    },
    editRecovery(arr) {
      let content = '';
      $.each(arr, (i, e)=>{
        let commandlist = e.RawCommand.split(" ")
        content += `
          <tr>
            <td>${e.Name}</td>
            <td>${e.host}</td>
            <td>${commandlist[commandlist.length-2]+" "+commandlist[commandlist.length-1]}</td>
          </tr>
        `
      })
      let res = `
      <table class="layui-table orderTable">
      <colgroup>
        <col width="30%">
        <col width="30%">
        <col width="30%">
      </colgroup>
      <thead>
        <tr>
          <th>名称</th>
          <th>设备</th>
          <th>命令</th>
        </tr> 
      </thead>
      <tbody>
        ${content}
      </tbody>
    </table>
      `
      return res=['恢复命令', res]
    },
    submitFile(type, data) {
      return data
    },
    onSubmit(edit, id) {
      if(edit=='delete'){return '/api/v1/linkage/delete'}
      return '/api/v1/linkage/create';
    }
  }
}
