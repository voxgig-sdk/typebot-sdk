<?php
declare(strict_types=1);

// Typebot SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class TypebotFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new TypebotBaseFeature();
            case "test":
                return new TypebotTestFeature();
            default:
                return new TypebotBaseFeature();
        }
    }
}
