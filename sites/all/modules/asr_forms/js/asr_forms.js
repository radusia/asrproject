(function ($) {
  ASR_Forms = {};

  //not in use
  ASR_Forms.submitAlgorithm = function() {
	 // alert('here');
  };

  //fill organism list select
  ASR_Forms.GetOrganismList = function() {
	 // alert('GetOrganismList');
	  jQuery(".loading_small").show();
	  ASR_Forms.callAjax('GetOrganismList', {}, "organisms");
  };
  
  //fill retrotransposons list
  ASR_Forms.GetRetrotransposonsList = function(OrganismId) {
	//  alert('GetRetrotransposonsList');
	  ASR_Forms.InitSelectField('retrotransposons');
	  ASR_Forms.InitSelectField('retrotransposons-portion');
	  if(OrganismId != '') {
		  jQuery(".loading_small").show();
		  ASR_Forms.callAjax('GetRetrotransposonsList', {'OrganismId':OrganismId}, "retrotransposons");
	  }
  };
  
  //fill retrotransposons portion list
  ASR_Forms.GetRetrotransposonsPortionList = function(OrganismId, RetrotransposonsId) {
	 // alert('GetRetrotransposonsPortionList');
	  ASR_Forms.InitSelectField('retrotransposons-portion');
	  if(OrganismId != '' && RetrotransposonsId!='') {
		  jQuery(".loading_small").show();
		  ASR_Forms.callAjax('GetRetrotransposonsPortionList', {'OrganismId':OrganismId, 'RetrotransposonsId':RetrotransposonsId}, "retrotransposons-portion");
	  }
  };
  
  //init fields
  ASR_Forms.InitSelectField = function(ElementName) {
	  jQuery('.form-item-alignement-'+ElementName).hide();
	  jQuery("#edit-alignement-"+ElementName).html('<option value="">-Select-</option>');
  };
  
  //ajax request to fill relevant list
  ASR_Forms.callAjax = function(Method, DataObject, ElementName) {
	//  alert(this);
	  List = jQuery("#edit-alignement-"+ElementName);
	  jQuery.post('/asr_api/'+Method, DataObject,
			  function(data){
		      //alert(data.toSource());
		      if(data.Error == 'NoError') {
		    	  ASR_Forms.addItems(List, data.list);
		    	 //console.log(data.name); // John
			     //console.log(data.time); //  2pm
		    	 jQuery('.form-item-alignement-'+ElementName).show();
	   		  }
		      else {
		    	  alert('Error accured in method ' + Method);
		      }
		      jQuery(".loading_small").hide();
	   }, "json");
  };
  
  //add items to select field
  ASR_Forms.addItems = function(list, data) {
	//  alert(data.toSource());
	//  alert(this);
      $.each(data, function(index, itemData) {
    	  list.append(jQuery("<option></option>").attr("value",itemData.Id).text(itemData.Name)); 
      });
  };
  //$(Drupal.Panels.autoAttach);
})(jQuery);

jQuery(document).ready(function() {
	ASR_Forms.GetOrganismList();
	jQuery("#edit-alignement-organisms").change(function() { ASR_Forms.GetRetrotransposonsList(jQuery(this).val());  /*alert('you selected ' + jQuery(this).val());*/ });
	jQuery("#edit-alignement-retrotransposons").change(function() { ASR_Forms.GetRetrotransposonsPortionList(jQuery("#edit-alignement-organisms").val(), jQuery(this).val());  /*alert('you selected ' + jQuery(this).val());*/ });
    //$('.submit_algorithm').bind('click', function() {$.GF_SubmitForm('real');}); 
});