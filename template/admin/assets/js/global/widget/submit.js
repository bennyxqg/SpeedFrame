
var submit = (function(){
	var button = new buttonWidget();
	var submitMain = function(option){
		var formData = new formParams(option.form);
		$.each(option.rule , function(key, value) {
			option.rule[key].other = formData.target[key];
		});
		var params = paramsRule.check(formData , option.rule);
		data = {};

		
		// 用户是否填写了错误处理方法
		if( ! isset(option.success)) option.success = function(data){
			button.reLoading(option.target);
			popup.toast(option.message);
			
			setTimeout(function(){
				window.location.reload();
			} , 1200)
		};
		if( ! isset(option.error)) option.error = function(data , errorType){
			button.reLoading(option.target);
			var message = '';
			switch(errorType){
				case 'string' : message = data;break;
				case 0 : message = data.text;break;
				case 1 : message = data.message;break;
			}
			if(errorType == 'string' || errorType == 1){
				popup.toast(message);
			}else{
				popup.inputToast(message , data.other)
			}
		};




		if( ! params){
			option.error(paramsRule.reslut() , 0)
			return false;
		}
		option.api(params).then(function(message){
			option.success(message);
			return true;
		}, function(error){
			option.error(error , typeof error == 'string' ? 'string' : 1)
			return false;
		});


	};
	return submitMain;
})(jQuery);
