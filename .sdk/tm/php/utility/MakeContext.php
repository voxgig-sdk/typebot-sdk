<?php
declare(strict_types=1);

// Typebot SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class TypebotMakeContext
{
    public static function call(array $ctxmap, ?TypebotContext $basectx): TypebotContext
    {
        return new TypebotContext($ctxmap, $basectx);
    }
}
