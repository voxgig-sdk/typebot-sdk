<?php
declare(strict_types=1);

// Typebot SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

TypebotUtility::setRegistrar(function (TypebotUtility $u): void {
    $u->clean = [TypebotClean::class, 'call'];
    $u->done = [TypebotDone::class, 'call'];
    $u->make_error = [TypebotMakeError::class, 'call'];
    $u->feature_add = [TypebotFeatureAdd::class, 'call'];
    $u->feature_hook = [TypebotFeatureHook::class, 'call'];
    $u->feature_init = [TypebotFeatureInit::class, 'call'];
    $u->fetcher = [TypebotFetcher::class, 'call'];
    $u->make_fetch_def = [TypebotMakeFetchDef::class, 'call'];
    $u->make_context = [TypebotMakeContext::class, 'call'];
    $u->make_options = [TypebotMakeOptions::class, 'call'];
    $u->make_request = [TypebotMakeRequest::class, 'call'];
    $u->make_response = [TypebotMakeResponse::class, 'call'];
    $u->make_result = [TypebotMakeResult::class, 'call'];
    $u->make_point = [TypebotMakePoint::class, 'call'];
    $u->make_spec = [TypebotMakeSpec::class, 'call'];
    $u->make_url = [TypebotMakeUrl::class, 'call'];
    $u->param = [TypebotParam::class, 'call'];
    $u->prepare_auth = [TypebotPrepareAuth::class, 'call'];
    $u->prepare_body = [TypebotPrepareBody::class, 'call'];
    $u->prepare_headers = [TypebotPrepareHeaders::class, 'call'];
    $u->prepare_method = [TypebotPrepareMethod::class, 'call'];
    $u->prepare_params = [TypebotPrepareParams::class, 'call'];
    $u->prepare_path = [TypebotPreparePath::class, 'call'];
    $u->prepare_query = [TypebotPrepareQuery::class, 'call'];
    $u->result_basic = [TypebotResultBasic::class, 'call'];
    $u->result_body = [TypebotResultBody::class, 'call'];
    $u->result_headers = [TypebotResultHeaders::class, 'call'];
    $u->transform_request = [TypebotTransformRequest::class, 'call'];
    $u->transform_response = [TypebotTransformResponse::class, 'call'];
});
