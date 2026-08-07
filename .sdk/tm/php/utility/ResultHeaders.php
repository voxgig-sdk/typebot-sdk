<?php
declare(strict_types=1);

// Typebot SDK utility: result_headers

class TypebotResultHeaders
{
    public static function call(TypebotContext $ctx): ?TypebotResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
