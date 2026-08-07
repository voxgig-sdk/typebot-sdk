<?php
declare(strict_types=1);

// Typebot SDK utility: prepare_body

class TypebotPrepareBody
{
    public static function call(TypebotContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
