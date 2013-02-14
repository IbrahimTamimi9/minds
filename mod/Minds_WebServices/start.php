<?php
/**
 * Minds Web Services
 * 
 * @package Webservice
 * @author Mark Harding
 *
 */
function minds_web_services_init() {
	
	
	require_once(dirname(dirname(__FILE__))."/kaltura_video/kaltura/api_client/includes.php");
	
	//Core library
	elgg_register_library('webservice:core', elgg_get_plugins_path() . 'Minds_WebServices/lib/core.php');
	elgg_load_library('webservice:core');
	elgg_register_library('webservice:blog', elgg_get_plugins_path() . 'Minds_WebServices/lib/blog.php');
	elgg_load_library('webservice:blog');
	elgg_register_library('webservice:file', elgg_get_plugins_path() . 'Minds_WebServices/lib/file.php');
	elgg_load_library('webservice:file');
	elgg_register_library('webservice:group', elgg_get_plugins_path() . 'Minds_WebServices/lib/group.php');
	elgg_load_library('webservice:group');
	elgg_register_library('webservice:message', elgg_get_plugins_path() . 'Minds_WebServices/lib/message.php');
	elgg_load_library('webservice:message');
	elgg_register_library('webservice:user', elgg_get_plugins_path() . 'Minds_WebServices/lib/user.php');
	elgg_load_library('webservice:user');
	elgg_register_library('webservice:wire', elgg_get_plugins_path() . 'Minds_WebServices/lib/wire.php');
	elgg_load_library('webservice:wire');
	elgg_register_library('webservice:kaltura', elgg_get_plugins_path() . 'Minds_WebServices/lib/kaltura.php');
	elgg_load_library('webservice:kaltura');
	elgg_register_library('webservice:wall', elgg_get_plugins_path() . 'Minds_WebServices/lib/wall.php');
	elgg_load_library('webservice:wall');
	elgg_register_library('webservice:thumbs', elgg_get_plugins_path() . 'Minds_WebServices/lib/thumbs.php');
	elgg_load_library('webservice:thumbs');
	elgg_register_library('webservice:notifications', elgg_get_plugins_path() . 'Minds_WebServices/lib/notifications.php');
	elgg_load_library('webservice:notifications');
	elgg_register_library('webservice:chat', elgg_get_plugins_path() . 'Minds_WebServices/lib/chat.php');
	elgg_load_library('webservice:chat');
	elgg_register_library('webservice:comments', elgg_get_plugins_path() . 'Minds_WebServices/lib/comments.php');
	elgg_load_library('webservice:comments');
	elgg_register_library('webservice:minds', elgg_get_plugins_path() . 'Minds_WebServices/lib/minds.php');
	elgg_load_library('webservice:minds');
}


elgg_register_event_handler('init', 'system', 'minds_web_services_init');
