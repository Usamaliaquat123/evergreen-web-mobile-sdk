console.log('====================================');
console.log(new Date().toString());
console.log('====================================');
const request =require('request')
console.log('====================================');
console.log(new Date().getFullYear());
console.log('====================================');
function asd(){
    request.get({
    dataType: 'jsonp',
    url: 'http://timeapi.org/utc/now.json',
    success: function (result) {
        console.log('====================================');
        console.log("Inside success ");
        console.log('====================================');
        alert(result.dateString);
    },
    error:(err)=>{
        console.log('====================================');
        console.log("Inside error ");
        console.log('====================================');
        console.log('====================================');
        console.log(err);
        console.log('====================================');
    }
})
}
console.log('====================================');
console.log((asd));
console.log('====================================');