$("#tabs").tabs();
$("#slider").slider();

prettyPrint();

function bindedParameter(name) {
	this.name = name;
	this.value = 0;

	this.addTo = function(formId) {
		$( "<div class=\"control-group\"> \
			<label for=\""+name+"\" class=\"control-label\">"+name+": </label> \
			<div class=\"controls\"> \
				<input id=\""+name+"\" value="+this.value+"></input> \
			</div> \
		</div>").appendTo(formId);

		$("#"+name).change( function (obj) { 
			return function (e) {
				obj.value = parseInt($("#"+e.target.id).val());	
			}
		}(this) );
	}

	this.setValue = function(value) {
		$("#"+name).val(value);
		this.value = parseInt(value);
	}
}

$("#form-update").click(function () {
	clearCanvas();
	drawCloudsType1();
});
