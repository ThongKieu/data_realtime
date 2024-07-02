<?php
    if (! function_exists('nl2br_html')) {
        function nl2br_html($string) {
            return nl2br(e($string));
        }
    }
?>
