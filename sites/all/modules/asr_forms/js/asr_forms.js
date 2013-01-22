(function ($) {
  ASR_Forms = {};

  //not in use - will be in use for asynch alignmnet
  ASR_Forms.submitAlgorithm = function() {
	 //alert('here');
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
  
  //ajax request to fill relevant list
  //Archive result
  ASR_Forms.GetArchiveResult = function(id) {
	  $('#result').load('/asr_archive/archive_result/'+id, function() {
		  alert('Load was performed.');
	  });
  };
  
  //add items to select field
  ASR_Forms.addItems = function(list, data) {
	  //  alert(data.toSource());
      $.each(data, function(index, itemData) {
    	  list.append(jQuery("<option></option>").attr("value",itemData.Id).text(itemData.Name)); 
      });
  };
  
  //collase/uncollapse functionality
  ASR_Forms.toggleCollapse = function(id, ASRSequence, GenSubSequence) {
	  if(jQuery("#"+id).is('.collapsed')) {
		  jQuery("#"+id).removeClass('collapsed');
		  jQuery("#"+id).parent().after('<tr class="collapsedrow"><td>ASRSequence</td><td colspan="4">'+ASRSequence+'</td></tr>');
		  jQuery("#"+id).parent().after('<tr class="collapsedrow"><td>GenSubSequence</td><td colspan="4">'+GenSubSequence+'</td></tr>');
	  }
	  else {
		  jQuery("#"+id).addClass('collapsed');
		  jQuery("#"+id).parent().next().remove();
		  jQuery("#"+id).parent().next().remove();
	  }
   };
   
   //add collapsed rows to result table
   ASR_Forms.initCollapse = function() {
	      jQuery('.collapsible').addClass('collapsed');
	      jQuery('.collapsedrow').remove();
   };

   //add sorting to result tables
   ASR_Forms.tableSorter = function(id) {
	jQuery(".sticky-enabled").tablesorter({ sortList:[[1,0],[2,0],[3,0]] , headers: { 0: { sorter: false}, 4: {sorter: false} }});
	jQuery(".header").mouseup(function() { ASR_Forms.initCollapse(); });
  };

})(jQuery);

//call function on document ready
jQuery(document).ready(function() {
	ASR_Forms.GetOrganismList();	
	jQuery("#edit-alignement-organisms").change(function() { ASR_Forms.GetRetrotransposonsList(jQuery(this).val());  /*alert('you selected ' + jQuery(this).val());*/ });
	jQuery("#edit-alignement-retrotransposons").change(function() { ASR_Forms.GetRetrotransposonsPortionList(jQuery("#edit-alignement-organisms").val(), jQuery(this).val());  /*alert('you selected ' + jQuery(this).val());*/ });
});