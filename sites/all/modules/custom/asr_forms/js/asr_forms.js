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
	  $('#result').html(jQuery(".loading_small").html());
	  $('#result').load('/asr_archive/archive_result/'+id, function() {
		  //alert('Load was performed.');
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
		  var lines = '';
		  var styled_asr_seq = '';
		  var styled_sub_seq = '';
		  var patt=/a|c|g|t|-/;
		  jQuery.each(ASRSequence, function(index) {
			  if(this == GenSubSequence[index] && patt.test(GenSubSequence[index]) == true) {
				  lines += '|';
				  class_name = 'red';				 
			  }
			  else {
				  if(patt.test(GenSubSequence[index]) == true) {
					  if(ASRSequence[index] == '-' || GenSubSequence[index] == '-')
						  class_name = 'green';
					  else class_name = 'blue';
				  }
				  else class_name = 'black';
				  lines += '&nbsp;';
			  }
			  styled_asr_seq += '<span class="'+class_name+'">'+ASRSequence[index]+'</span>';
			  styled_sub_seq += '<span class="'+class_name+'">'+GenSubSequence[index]+'</span>';
		  });
		  str = '<tr class="collapsedrow"><td colspan="6">';
		  str += '<div class="scroll_wrapper"><div class="scroll_inner">';
		  str += '<br />ASRSequence:&nbsp;&nbsp;&nbsp;&nbsp;'+styled_asr_seq;
		  str += '<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+lines;
		  str += '<br /><br />GenSubSequence:&nbsp;'+styled_sub_seq+'</div></div></td></tr>';
		  
		  jQuery("#"+id).parent().after(str);

		  //jQuery("#"+id).parent().after('<tr class="collapsedrow"><td>ASRSequence</td><td colspan="4">'+styled_asr_seq+'</td></tr>');
		  //jQuery("#"+id).parent().after('<tr class="collapsedrow"><td>&nbsp;</td><td colspan="4">'+lines+'</td></tr>');
		  //jQuery("#"+id).parent().after('<tr class="collapsedrow"><td>GenSubSequence</td><td colspan="4">'+styled_sub_seq+'</td></tr>');
	  }
	  else {
		  jQuery("#"+id).addClass('collapsed');
		  jQuery("#"+id).parent().next().remove();
		  //jQuery("#"+id).parent().next().remove();
		  //jQuery("#"+id).parent().next().remove();
	  }
   };
   
   //add collapsed rows to result table
   ASR_Forms.initCollapse = function() {
	      jQuery('.collapsible').addClass('collapsed');
	      jQuery('.collapsedrow').remove();
   };

   //add sorting to result tables
   ASR_Forms.tableSorter = function(table) {
	jQuery("."+table).tablesorter({ sortList:[[1,0],[2,0],[3,0],[4,0]] , headers: { 0: { sorter: false}, 5: {sorter: false} }});
	jQuery("."+table+" .header").mouseup(function() { ASR_Forms.initCollapse(); });
	/*jQuery("."+table+" > tbody  > tr").each(function(index) {
		if(index%2 == 1 && this.hasClass("even")) { //odd
			this.removeClass("even");
			this.addClass("odd");
		}
		else if(index%2 == 0 && this.hasClass("odd")) { //even
			this.removeClass("odd");
			this.addClass("even");
		}
	});*/
   };

   
	//add tabs to result
	ASR_Forms.tabsContainer = function() {
		    //When page loads...
			jQuery(".tab_content").hide(); //Hide all content
			jQuery("ul.tabs li:first").addClass("active").show(); //Activate first tab
			jQuery(".tab_content:first").show(); //Show first tab content
		
				 //On Click Event
			jQuery("ul.tabs li").click(function() {

			jQuery("ul.tabs li").removeClass("active"); //Remove any "active" class
			jQuery(this).addClass("active"); //Add "active" class to selected tab
		    jQuery(".tab_content").hide(); //Hide all tab content

		    var activeTab = jQuery(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		    jQuery(activeTab).fadeIn(); //Fade in the active ID content
		    return false;
		 });

   };

})(jQuery);

//call function on document ready
jQuery(document).ready(function() {
	ASR_Forms.GetOrganismList();	
	jQuery("#edit-alignement-organisms").change(function() { ASR_Forms.GetRetrotransposonsList(jQuery(this).val());  /*alert('you selected ' + jQuery(this).val());*/ });
	jQuery("#edit-alignement-retrotransposons").change(function() { ASR_Forms.GetRetrotransposonsPortionList(jQuery("#edit-alignement-organisms").val(), jQuery(this).val());  /*alert('you selected ' + jQuery(this).val());*/ });
});


function drawChart(divId, data, title) {
	alert(data.toSource());
	var data = google.visualization.arrayToDataTable(data);

	var options = {
	 title: title,
	 //colors: [color],
	 hAxis: {title: 'Scores',  titleTextStyle: {color: 'green'}},
	 vAxis: {title: '% Dist. of Scores',  minValue: 0, titleTextStyle: {color: 'green'}},
	}
	
	//var chart = new google.visualization.LineChart(document.getElementById(divId));
	//var chart = new google.visualization.AreaChart(document.getElementById(divId));
	var chart = new google.visualization.ColumnChart(document.getElementById(divId));
	chart.draw(data, options);
}

function exportTable2Excel(table) {
	window.open('data:application/vnd.ms-excel,' + encodeURIComponent('<table>'+jQuery('.'+table).html()+'</table>'));
    e.preventDefault();
}