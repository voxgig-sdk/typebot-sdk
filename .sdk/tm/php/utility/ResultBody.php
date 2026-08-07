<?php
declare(strict_types=1);

// Typebot SDK utility: result_body

class TypebotResultBody
{
    public static function call(TypebotContext $ctx): ?TypebotResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
