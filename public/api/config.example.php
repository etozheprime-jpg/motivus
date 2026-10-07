<?php
/**
 * MOTIVUS – slapti nustatymai.
 *
 * SVARBU: nukopijuokite šį failą kaip  motivus-config.php  į aplanką, esantį
 * VIENU LYGIU AUKŠČIAU už public_html (ten pat, kur atsiranda motivus-leads/).
 * Taip raktai nepasiekiami iš interneto ir nepatenka į GitHub.
 *
 * Šio failo (config.example.php) viduje raktų NEĮRAŠYKITE.
 */
return [
    // Kam siųsti laiškus ir nuo kokio adreso (turi būti realus šio domeno adresas)
    'to'   => 'info@motivus.lt',
    'from' => 'noreply@motivus.lt',

    // Telegram: tokeną gaunate iš @BotFather, chat_id – žr. DIEGIMAS-HOSTINGER.md.
    // Keli gavėjai – per kablelį: '123456789,-1001234567890'
    'tg_token' => '',
    'tg_chat'  => '',

    // Go High Level (ar kitas) „Inbound Webhook“ adresas. Tuščia = išjungta.
    'webhook_url' => '',
];
