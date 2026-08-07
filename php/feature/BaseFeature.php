<?php
declare(strict_types=1);

// Typebot SDK base feature

class TypebotBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(TypebotContext $ctx, array $options): void {}
    public function PostConstruct(TypebotContext $ctx): void {}
    public function PostConstructEntity(TypebotContext $ctx): void {}
    public function SetData(TypebotContext $ctx): void {}
    public function GetData(TypebotContext $ctx): void {}
    public function GetMatch(TypebotContext $ctx): void {}
    public function SetMatch(TypebotContext $ctx): void {}
    public function PrePoint(TypebotContext $ctx): void {}
    public function PreSpec(TypebotContext $ctx): void {}
    public function PreRequest(TypebotContext $ctx): void {}
    public function PreResponse(TypebotContext $ctx): void {}
    public function PreResult(TypebotContext $ctx): void {}
    public function PreDone(TypebotContext $ctx): void {}
    public function PreUnexpected(TypebotContext $ctx): void {}
}
