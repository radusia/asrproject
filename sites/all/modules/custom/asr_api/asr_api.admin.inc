<?php

/**
 * API - admin settings form
 * Implementation of hook_form().
 */
function asr_api_admin_settings_form($form, &$form_state) {
 	$form['wsdl_settings'] = array(
    	'#type' => 'fieldset',
 		'#title' => t('WSDL Settings'),
 		'#description' => t('Define web service settings for alignment form usage'),
  	); 	
 	$form['wsdl_settings']['wsdl_url'] = array(
 			'#type' => 'textfield',
 			'#title' => t('WSDL URL'),
 			'#default_value' => ASR_API_WSDL_URL,
 	);
 	
 	return system_settings_form($form);
}