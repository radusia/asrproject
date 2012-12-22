<?php

/**
 * API - admin settings form
 * Implementation of hook_form().
 */
function asr_api_admin_settings_form($form, &$form_state) {
 	$form['wsdl_settings'] = array(
    	'#type' => 'fieldset',
 		'#title' => t('WSDL Settings'),
 		'#description' => t('text here'),
  	);
 	$form['wsdl_settings']['wsdl_url'] = array(
 			'#type' => 'textfield',
			'#title' => t('Minimum threshold value'),
 			'#default_value' => ASR_FORMS_THRESHOLD_MIN,
 	);
 	$form['wsdl_settings']['threshold_max'] = array(
 			'#type' => 'textfield',
			'#title' => t('Maximum threshold value'),
 			'#default_value' => ASR_FORMS_THRESHOLD_MAX,
 	);
 	$form['threshold_settings']['threshold_interval'] = array(
 			'#type' => 'textfield',
			'#title' => t('Threshold interval'),
 			'#default_value' => ASR_FORMS_THRESHOLD_INTERVAL,
 	);
 	
 	$form['segment_settings'] = array(
 			'#type' => 'fieldset',
 			'#title' => t('Alignement Form Segment Settings'),
 			'#description' => t('text here'),
 	);
 	$form['segment_settings']['segment_length_min'] = array(
 			'#type' => 'textfield',
 			'#title' => t('Minimum segment length value'),
 			'#default_value' => ASR_FORMS_SEGMENT_MIN,
 	);
 	$form['segment_settings']['segment_length_max'] = array(
 			'#type' => 'textfield',
 			'#title' => t('Maximum segment length value'),
 			'#default_value' => ASR_FORMS_SEGMENT_MAX,
 	);
 	$form['segment_settings']['segment_length_interval'] = array(
 			'#type' => 'textfield',
 			'#title' => t('Segment length interval'),
 			'#default_value' => ASR_FORMS_SEGMENT_INTERVAL,
 	);
 	
 	return system_settings_form($form);
}