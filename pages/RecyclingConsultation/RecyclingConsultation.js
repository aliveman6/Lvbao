Page({
  data: {
 
  list01: [
   { item_id: 1 },
  ],
  list02: [
    { item_id: 1 },
  ],
  list03: [
   { item_id: 11 },
  ],
  list04: [
   { item_id: 11 },
  ],
  list05: [
    { item_id: 11 },
   ],
   list06: [
    { item_id: 11 },
   ],
 
  // 展开折叠
  selectedFlag: [false, false, false, false, false, false],
 
  },
  // 展开折叠选择 
  changeToggle:function(e){
  var index = e.currentTarget.dataset.index;
  if (this.data.selectedFlag[index]){
   this.data.selectedFlag[index] = false;
  }else{
   this.data.selectedFlag[index] = true;
  }
 
  this.setData({
   selectedFlag: this.data.selectedFlag
  })
  },
 
 })