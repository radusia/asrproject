<?php

/**
 * Sequence alignment - admin settings form
 * Implementation of hook_form().
 */
function asr_forms_admin_settings_form($form, &$form_state) {
 	$form['threshold_settings'] = array(
    	'#type' => 'fieldset',
 		'#title' => t('Alignment Form Threshold Settings'),
 		'#description' => t('Define minimum and maximum values for threshold select field in alignment form'),
  	);
 	$form['threshold_settings']['threshold_min'] = array(
 			'#type' => 'textfield',
			'#title' => t('Minimum threshold value'),
 			'#default_value' => ASR_FORMS_THRESHOLD_MIN,
 	);
 	$form['threshold_settings']['threshold_max'] = array(
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
 			'#title' => t('Alignment Form Segment Settings'),
 			'#description' => t('Define minimum and maximum for segment length select in alignment form'),
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
 	$form['score_matrix_settings'] = array(
 			'#type' => 'fieldset',
 			'#title' => t('Alignment Form Score Matrix Settings'),
 			'#description' => t('Define minimum and maximum for alignment scor matrix select fields'),
 	);
 	$form['score_matrix_settings']['cost_gap_min'] = array(
 			'#type' => 'textfield',
 			'#title' => t('Minimum cost gap value'),
 			'#default_value' => ASR_FORMS_COST_GAP_MIN,
 	);
 	$form['score_matrix_settings']['cost_gap_max'] = array(
 			'#type' => 'textfield',
 			'#title' => t('Maximum cost gap value'),
 			'#default_value' => ASR_FORMS_COST_GAP_MAX,
 	);
 	
 	$form['chunk_settings'] = array(
 			'#type' => 'fieldset',
 			'#title' => t('Alignment Sequence Chunk Length'),
 			'#description' => t('Define length of each chunk to be aligned in algorithm per request.'),
 	);
 	$form['chunk_settings']['sequence_chunk_length'] = array(
 			'#type' => 'textfield',
 			'#title' => t('Sequence chunk length'),
 			'#default_value' => ASR_FORMS_CHUNK_LENGTH,
 	);
 	
 	return system_settings_form($form);
}