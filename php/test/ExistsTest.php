<?php
declare(strict_types=1);

// Typebot SDK exists test

require_once __DIR__ . '/../typebot_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = TypebotSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
