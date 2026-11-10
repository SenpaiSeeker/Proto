Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../_virtual/_rolldown/runtime.js");
const require_errors_RPCBaseErrors = require("./RPCBaseErrors.js");
// teleproto/errors/RPCErrorList.ts
var RPCErrorList_exports = /* @__PURE__ */ require_runtime.__exportAll({
	AboutTooLongError: () => AboutTooLongError,
	AccessDeniedError: () => AccessDeniedError,
	AccessTokenExpiredError: () => AccessTokenExpiredError,
	AccessTokenInvalidError: () => AccessTokenInvalidError,
	ActiveUserRequiredError: () => ActiveUserRequiredError,
	AdExpiredError: () => AdExpiredError,
	AddressInvalidError: () => AddressInvalidError,
	AdminIdInvalidError: () => AdminIdInvalidError,
	AdminRankEmojiNotAllowedError: () => AdminRankEmojiNotAllowedError,
	AdminRankInvalidError: () => AdminRankInvalidError,
	AdminRightsEmptyError: () => AdminRightsEmptyError,
	AdminsTooMuchError: () => AdminsTooMuchError,
	AiComposeTaskMissingError: () => AiComposeTaskMissingError,
	AicomposeFloodPremiumError: () => AicomposeFloodPremiumError,
	AicomposeTimeoutError: () => AicomposeTimeoutError,
	AicomposeToneInvalidError: () => AicomposeToneInvalidError,
	AicomposeToneTitleInvalidError: () => AicomposeToneTitleInvalidError,
	AlbumPhotosTooManyError: () => AlbumPhotosTooManyError,
	AllowPaymentRequiredError: () => AllowPaymentRequiredError,
	AnonymousReactionsDisabledError: () => AnonymousReactionsDisabledError,
	ApiGiftRestrictedUpdateAppError: () => ApiGiftRestrictedUpdateAppError,
	ApiIdInvalidError: () => ApiIdInvalidError,
	ApiIdPublishedFloodError: () => ApiIdPublishedFloodError,
	ArticleTitleEmptyError: () => ArticleTitleEmptyError,
	AudioContentUrlEmptyError: () => AudioContentUrlEmptyError,
	AudioTitleEmptyError: () => AudioTitleEmptyError,
	AuthBytesInvalidError: () => AuthBytesInvalidError,
	AuthKeyDuplicatedError: () => AuthKeyDuplicatedError,
	AuthKeyInvalidError: () => AuthKeyInvalidError,
	AuthKeyPermEmptyError: () => AuthKeyPermEmptyError,
	AuthKeyUnregisteredError: () => AuthKeyUnregisteredError,
	AuthKeyUnsynchronizedError: () => AuthKeyUnsynchronizedError,
	AuthRestartError: () => AuthRestartError,
	AuthTokenAlreadyAcceptedError: () => AuthTokenAlreadyAcceptedError,
	AuthTokenExceptionError: () => AuthTokenExceptionError,
	AuthTokenExpiredError: () => AuthTokenExpiredError,
	AuthTokenInvalid2Error: () => AuthTokenInvalid2Error,
	AuthTokenInvalidError: () => AuthTokenInvalidError,
	AuthTokenInvalidxError: () => AuthTokenInvalidxError,
	AutoarchiveNotAvailableError: () => AutoarchiveNotAvailableError,
	BalanceTooLowError: () => BalanceTooLowError,
	BankCardNumberInvalidError: () => BankCardNumberInvalidError,
	BannedRightsInvalidError: () => BannedRightsInvalidError,
	BasePortLocInvalidError: () => BasePortLocInvalidError,
	BirthdayAlreadyError: () => BirthdayAlreadyError,
	BirthdayInvalidError: () => BirthdayInvalidError,
	BoostNotModifiedError: () => BoostNotModifiedError,
	BoostPeerInvalidError: () => BoostPeerInvalidError,
	BoostsEmptyError: () => BoostsEmptyError,
	BoostsRequiredError: () => BoostsRequiredError,
	BotAccessForbiddenError: () => BotAccessForbiddenError,
	BotAlreadyDisabledError: () => BotAlreadyDisabledError,
	BotAppBotInvalidError: () => BotAppBotInvalidError,
	BotAppInvalidError: () => BotAppInvalidError,
	BotAppShortnameInvalidError: () => BotAppShortnameInvalidError,
	BotBusinessMissingError: () => BotBusinessMissingError,
	BotChannelsNaError: () => BotChannelsNaError,
	BotCommandDescriptionInvalidError: () => BotCommandDescriptionInvalidError,
	BotCommandInvalidError: () => BotCommandInvalidError,
	BotCommandsTooMuchError: () => BotCommandsTooMuchError,
	BotCreateLimitExceededError: () => BotCreateLimitExceededError,
	BotDomainInvalidError: () => BotDomainInvalidError,
	BotFallbackUnsupportedError: () => BotFallbackUnsupportedError,
	BotForumCreateForbiddenError: () => BotForumCreateForbiddenError,
	BotGamesDisabledError: () => BotGamesDisabledError,
	BotGroupsBlockedError: () => BotGroupsBlockedError,
	BotGuardNotSupportedError: () => BotGuardNotSupportedError,
	BotIdInvalidError: () => BotIdInvalidError,
	BotInlineDisabledError: () => BotInlineDisabledError,
	BotInvalidError: () => BotInvalidError,
	BotInvoiceInvalidError: () => BotInvoiceInvalidError,
	BotMethodInvalidError: () => BotMethodInvalidError,
	BotMissingError: () => BotMissingError,
	BotNotConnectedYetError: () => BotNotConnectedYetError,
	BotOnesideNotAvailError: () => BotOnesideNotAvailError,
	BotPaymentsDisabledError: () => BotPaymentsDisabledError,
	BotPollsDisabledError: () => BotPollsDisabledError,
	BotResponseTimeoutError: () => BotResponseTimeoutError,
	BotScoreNotModifiedError: () => BotScoreNotModifiedError,
	BotVerifierForbiddenError: () => BotVerifierForbiddenError,
	BotWebviewDisabledError: () => BotWebviewDisabledError,
	BotsTooMuchError: () => BotsTooMuchError,
	BroadcastCallsDisabledError: () => BroadcastCallsDisabledError,
	BroadcastForbiddenError: () => BroadcastForbiddenError,
	BroadcastIdInvalidError: () => BroadcastIdInvalidError,
	BroadcastPublicVotersForbiddenError: () => BroadcastPublicVotersForbiddenError,
	BroadcastRequiredError: () => BroadcastRequiredError,
	BusinessAddressActiveError: () => BusinessAddressActiveError,
	BusinessConnectionInvalidError: () => BusinessConnectionInvalidError,
	BusinessConnectionNotAllowedError: () => BusinessConnectionNotAllowedError,
	BusinessPeerInvalidError: () => BusinessPeerInvalidError,
	BusinessPeerUsageMissingError: () => BusinessPeerUsageMissingError,
	BusinessRecipientsEmptyError: () => BusinessRecipientsEmptyError,
	BusinessWorkHoursEmptyError: () => BusinessWorkHoursEmptyError,
	BusinessWorkHoursPeriodInvalidError: () => BusinessWorkHoursPeriodInvalidError,
	ButtonCopyTextInvalidError: () => ButtonCopyTextInvalidError,
	ButtonDataInvalidError: () => ButtonDataInvalidError,
	ButtonIdInvalidError: () => ButtonIdInvalidError,
	ButtonInvalidError: () => ButtonInvalidError,
	ButtonPosInvalidError: () => ButtonPosInvalidError,
	ButtonTextInvalidError: () => ButtonTextInvalidError,
	ButtonTypeInvalidError: () => ButtonTypeInvalidError,
	ButtonUrlInvalidError: () => ButtonUrlInvalidError,
	ButtonUserInvalidError: () => ButtonUserInvalidError,
	ButtonUserPrivacyRestrictedError: () => ButtonUserPrivacyRestrictedError,
	CallAlreadyAcceptedError: () => CallAlreadyAcceptedError,
	CallAlreadyDeclinedError: () => CallAlreadyDeclinedError,
	CallNotActiveError: () => CallNotActiveError,
	CallOccupyFailedError: () => CallOccupyFailedError,
	CallPeerInvalidError: () => CallPeerInvalidError,
	CallProtocolCompatLayerInvalidError: () => CallProtocolCompatLayerInvalidError,
	CallProtocolFlagsInvalidError: () => CallProtocolFlagsInvalidError,
	CallProtocolLayerInvalidError: () => CallProtocolLayerInvalidError,
	CdnMethodInvalidError: () => CdnMethodInvalidError,
	CdnUploadTimeoutError: () => CdnUploadTimeoutError,
	ChannelBannedError: () => ChannelBannedError,
	ChannelForumMissingError: () => ChannelForumMissingError,
	ChannelIdInvalidError: () => ChannelIdInvalidError,
	ChannelInvalidError: () => ChannelInvalidError,
	ChannelMonoforumUnsupportedError: () => ChannelMonoforumUnsupportedError,
	ChannelParicipantMissingError: () => ChannelParicipantMissingError,
	ChannelPrivateError: () => ChannelPrivateError,
	ChannelPublicGroupNaError: () => ChannelPublicGroupNaError,
	ChannelTooBigError: () => ChannelTooBigError,
	ChannelTooLargeError: () => ChannelTooLargeError,
	ChannelsAdminLocatedTooMuchError: () => ChannelsAdminLocatedTooMuchError,
	ChannelsAdminPublicTooMuchError: () => ChannelsAdminPublicTooMuchError,
	ChannelsTooMuchError: () => ChannelsTooMuchError,
	ChargeAlreadyRefundedError: () => ChargeAlreadyRefundedError,
	ChargeIdEmptyError: () => ChargeIdEmptyError,
	ChargeIdInvalidError: () => ChargeIdInvalidError,
	ChatAboutNotModifiedError: () => ChatAboutNotModifiedError,
	ChatAboutTooLongError: () => ChatAboutTooLongError,
	ChatActionForbiddenError: () => ChatActionForbiddenError,
	ChatAdminInviteRequiredError: () => ChatAdminInviteRequiredError,
	ChatAdminRequiredError: () => ChatAdminRequiredError,
	ChatDiscussionUnallowedError: () => ChatDiscussionUnallowedError,
	ChatForbiddenError: () => ChatForbiddenError,
	ChatForwardsRestrictedError: () => ChatForwardsRestrictedError,
	ChatGetFailedError: () => ChatGetFailedError,
	ChatGuestSendForbiddenError: () => ChatGuestSendForbiddenError,
	ChatIdEmptyError: () => ChatIdEmptyError,
	ChatIdGenerateFailedError: () => ChatIdGenerateFailedError,
	ChatIdInvalidError: () => ChatIdInvalidError,
	ChatInvalidError: () => ChatInvalidError,
	ChatInvitePermanentError: () => ChatInvitePermanentError,
	ChatLinkExistsError: () => ChatLinkExistsError,
	ChatMemberAddFailedError: () => ChatMemberAddFailedError,
	ChatNotModifiedError: () => ChatNotModifiedError,
	ChatPublicRequiredError: () => ChatPublicRequiredError,
	ChatRestrictedError: () => ChatRestrictedError,
	ChatRevokeDateUnsupportedError: () => ChatRevokeDateUnsupportedError,
	ChatSendAudiosForbiddenError: () => ChatSendAudiosForbiddenError,
	ChatSendDocsForbiddenError: () => ChatSendDocsForbiddenError,
	ChatSendGameForbiddenError: () => ChatSendGameForbiddenError,
	ChatSendGifsForbiddenError: () => ChatSendGifsForbiddenError,
	ChatSendInlineForbiddenError: () => ChatSendInlineForbiddenError,
	ChatSendMediaForbiddenError: () => ChatSendMediaForbiddenError,
	ChatSendPhotosForbiddenError: () => ChatSendPhotosForbiddenError,
	ChatSendPlainForbiddenError: () => ChatSendPlainForbiddenError,
	ChatSendPollForbiddenError: () => ChatSendPollForbiddenError,
	ChatSendRoundvideosForbiddenError: () => ChatSendRoundvideosForbiddenError,
	ChatSendStickersForbiddenError: () => ChatSendStickersForbiddenError,
	ChatSendVideosForbiddenError: () => ChatSendVideosForbiddenError,
	ChatSendVoicesForbiddenError: () => ChatSendVoicesForbiddenError,
	ChatSendWebpageForbiddenError: () => ChatSendWebpageForbiddenError,
	ChatTitleEmptyError: () => ChatTitleEmptyError,
	ChatTooBigError: () => ChatTooBigError,
	ChatTypeInvalidError: () => ChatTypeInvalidError,
	ChatWriteForbiddenError: () => ChatWriteForbiddenError,
	ChatlinkSlugEmptyError: () => ChatlinkSlugEmptyError,
	ChatlinkSlugExpiredError: () => ChatlinkSlugExpiredError,
	ChatlinksTooMuchError: () => ChatlinksTooMuchError,
	ChatlistExcludeInvalidError: () => ChatlistExcludeInvalidError,
	ChatlistsTooMuchError: () => ChatlistsTooMuchError,
	ChpCallFailError: () => ChpCallFailError,
	CodeEmptyError: () => CodeEmptyError,
	CodeHashInvalidError: () => CodeHashInvalidError,
	CodeInvalidError: () => CodeInvalidError,
	CollectibleInvalidError: () => CollectibleInvalidError,
	CollectibleNotFoundError: () => CollectibleNotFoundError,
	CollectionIdInvalidError: () => CollectionIdInvalidError,
	ColorInvalidError: () => ColorInvalidError,
	ConnectionApiIdInvalidError: () => ConnectionApiIdInvalidError,
	ConnectionAppVersionEmptyError: () => ConnectionAppVersionEmptyError,
	ConnectionDeviceModelEmptyError: () => ConnectionDeviceModelEmptyError,
	ConnectionIdInvalidError: () => ConnectionIdInvalidError,
	ConnectionLangPackInvalidError: () => ConnectionLangPackInvalidError,
	ConnectionLayerInvalidError: () => ConnectionLayerInvalidError,
	ConnectionNotInitedError: () => ConnectionNotInitedError,
	ConnectionSystemEmptyError: () => ConnectionSystemEmptyError,
	ConnectionSystemLangCodeEmptyError: () => ConnectionSystemLangCodeEmptyError,
	ContactAddMissingError: () => ContactAddMissingError,
	ContactIdInvalidError: () => ContactIdInvalidError,
	ContactMissingError: () => ContactMissingError,
	ContactNameEmptyError: () => ContactNameEmptyError,
	ContactReqMissingError: () => ContactReqMissingError,
	CreateCallFailedError: () => CreateCallFailedError,
	CredentialInvalidError: () => CredentialInvalidError,
	CurrencyTotalAmountInvalidError: () => CurrencyTotalAmountInvalidError,
	CustomReactionsTooManyError: () => CustomReactionsTooManyError,
	DataHashSizeInvalidError: () => DataHashSizeInvalidError,
	DataInvalidError: () => DataInvalidError,
	DataJsonInvalidError: () => DataJsonInvalidError,
	DataTooLongError: () => DataTooLongError,
	DateEmptyError: () => DateEmptyError,
	DcIdInvalidError: () => DcIdInvalidError,
	DhGAInvalidError: () => DhGAInvalidError,
	DocumentInvalidError: () => DocumentInvalidError,
	EditBotInviteForbiddenError: () => EditBotInviteForbiddenError,
	EditMessageTempRestrictedError: () => EditMessageTempRestrictedError,
	EffectChatInvalidError: () => EffectChatInvalidError,
	EffectIdInvalidError: () => EffectIdInvalidError,
	EmailHashExpiredError: () => EmailHashExpiredError,
	EmailInstallMissingError: () => EmailInstallMissingError,
	EmailInvalidError: () => EmailInvalidError,
	EmailNotAllowedError: () => EmailNotAllowedError,
	EmailNotSetupError: () => EmailNotSetupError,
	EmailUnconfirmedError: () => EmailUnconfirmedError,
	EmailVerifyExpiredError: () => EmailVerifyExpiredError,
	EmojiInvalidError: () => EmojiInvalidError,
	EmojiMarkupInvalidError: () => EmojiMarkupInvalidError,
	EmojiNotModifiedError: () => EmojiNotModifiedError,
	EmoticonEmptyError: () => EmoticonEmptyError,
	EmoticonInvalidError: () => EmoticonInvalidError,
	EmoticonStickerpackMissingError: () => EmoticonStickerpackMissingError,
	EncryptedMessageInvalidError: () => EncryptedMessageInvalidError,
	EncryptionAlreadyAcceptedError: () => EncryptionAlreadyAcceptedError,
	EncryptionAlreadyDeclinedError: () => EncryptionAlreadyDeclinedError,
	EncryptionDeclinedError: () => EncryptionDeclinedError,
	EncryptionIdInvalidError: () => EncryptionIdInvalidError,
	EncryptionOccupyFailedError: () => EncryptionOccupyFailedError,
	EntitiesTooLongError: () => EntitiesTooLongError,
	EntityBoundsInvalidError: () => EntityBoundsInvalidError,
	EntityDateFormatInvalidError: () => EntityDateFormatInvalidError,
	EntityDateInvalidError: () => EntityDateInvalidError,
	EntityDateTooLongError: () => EntityDateTooLongError,
	EntityMentionUserInvalidError: () => EntityMentionUserInvalidError,
	ErrorTextEmptyError: () => ErrorTextEmptyError,
	ExpireDateInvalidError: () => ExpireDateInvalidError,
	ExpireForbiddenError: () => ExpireForbiddenError,
	ExpiresAtInvalidError: () => ExpiresAtInvalidError,
	ExportCardInvalidError: () => ExportCardInvalidError,
	ExtendedMediaAmountInvalidError: () => ExtendedMediaAmountInvalidError,
	ExtendedMediaEmptyError: () => ExtendedMediaEmptyError,
	ExtendedMediaInvalidError: () => ExtendedMediaInvalidError,
	ExtendedMediaPeerInvalidError: () => ExtendedMediaPeerInvalidError,
	ExternalUrlInvalidError: () => ExternalUrlInvalidError,
	FieldNameEmptyError: () => FieldNameEmptyError,
	FieldNameInvalidError: () => FieldNameInvalidError,
	FileContentTypeInvalidError: () => FileContentTypeInvalidError,
	FileEmtpyError: () => FileEmtpyError,
	FileIdInvalidError: () => FileIdInvalidError,
	FileMigrateError: () => FileMigrateError,
	FilePart0MissingError: () => FilePart0MissingError,
	FilePartEmptyError: () => FilePartEmptyError,
	FilePartInvalidError: () => FilePartInvalidError,
	FilePartLengthInvalidError: () => FilePartLengthInvalidError,
	FilePartMissingError: () => FilePartMissingError,
	FilePartSizeChangedError: () => FilePartSizeChangedError,
	FilePartSizeInvalidError: () => FilePartSizeInvalidError,
	FilePartTooBigError: () => FilePartTooBigError,
	FilePartTooSmallError: () => FilePartTooSmallError,
	FilePartsInvalidError: () => FilePartsInvalidError,
	FileReferenceEmptyError: () => FileReferenceEmptyError,
	FileReferenceExpiredError: () => FileReferenceExpiredError,
	FileReferenceInvalidError: () => FileReferenceInvalidError,
	FileTitleEmptyError: () => FileTitleEmptyError,
	FileTokenInvalidError: () => FileTokenInvalidError,
	FilerefUpgradeNeededError: () => FilerefUpgradeNeededError,
	FilterIdInvalidError: () => FilterIdInvalidError,
	FilterIncludeEmptyError: () => FilterIncludeEmptyError,
	FilterNotSupportedError: () => FilterNotSupportedError,
	FilterTitleEmptyError: () => FilterTitleEmptyError,
	FirstnameInvalidError: () => FirstnameInvalidError,
	FloodTestPhoneWaitError: () => FloodTestPhoneWaitError,
	FloodWaitError: () => FloodWaitError,
	FolderIdEmptyError: () => FolderIdEmptyError,
	FolderIdInvalidError: () => FolderIdInvalidError,
	FormExpiredError: () => FormExpiredError,
	FormIdEmptyError: () => FormIdEmptyError,
	FormSubmitDuplicateError: () => FormSubmitDuplicateError,
	FormUnsupportedError: () => FormUnsupportedError,
	ForumEnabledError: () => ForumEnabledError,
	FreshChangeAdminsForbiddenError: () => FreshChangeAdminsForbiddenError,
	FreshChangePhoneForbiddenError: () => FreshChangePhoneForbiddenError,
	FreshResetAuthorisationForbiddenError: () => FreshResetAuthorisationForbiddenError,
	FromMessageBotDisabledError: () => FromMessageBotDisabledError,
	FromPeerInvalidError: () => FromPeerInvalidError,
	FrozenMethodInvalidError: () => FrozenMethodInvalidError,
	FrozenParticipantMissingError: () => FrozenParticipantMissingError,
	GameBotInvalidError: () => GameBotInvalidError,
	GeneralModifyIconForbiddenError: () => GeneralModifyIconForbiddenError,
	GeoPointInvalidError: () => GeoPointInvalidError,
	GifContentTypeInvalidError: () => GifContentTypeInvalidError,
	GifIdInvalidError: () => GifIdInvalidError,
	GiftMonthsInvalidError: () => GiftMonthsInvalidError,
	GiftSlugExpiredError: () => GiftSlugExpiredError,
	GiftSlugInvalidError: () => GiftSlugInvalidError,
	GiftStarsInvalidError: () => GiftStarsInvalidError,
	GraphExpiredReloadError: () => GraphExpiredReloadError,
	GraphInvalidReloadError: () => GraphInvalidReloadError,
	GraphOutdatedReloadError: () => GraphOutdatedReloadError,
	GroupCallInvalidError: () => GroupCallInvalidError,
	GroupcallAddParticipantsFailedError: () => GroupcallAddParticipantsFailedError,
	GroupcallAlreadyDiscardedError: () => GroupcallAlreadyDiscardedError,
	GroupcallAlreadyStartedError: () => GroupcallAlreadyStartedError,
	GroupcallChangeForbiddenError: () => GroupcallChangeForbiddenError,
	GroupcallForbiddenError: () => GroupcallForbiddenError,
	GroupcallInvalidError: () => GroupcallInvalidError,
	GroupcallJoinMissingError: () => GroupcallJoinMissingError,
	GroupcallNotModifiedError: () => GroupcallNotModifiedError,
	GroupcallSsrcDuplicateMuchError: () => GroupcallSsrcDuplicateMuchError,
	GroupedMediaInvalidError: () => GroupedMediaInvalidError,
	HashInvalidError: () => HashInvalidError,
	HashSizeInvalidError: () => HashSizeInvalidError,
	HashtagInvalidError: () => HashtagInvalidError,
	HideRequesterMissingError: () => HideRequesterMissingError,
	HistoryGetFailedError: () => HistoryGetFailedError,
	IdExpiredError: () => IdExpiredError,
	IdInvalidError: () => IdInvalidError,
	ImageProcessFailedError: () => ImageProcessFailedError,
	ImportFileInvalidError: () => ImportFileInvalidError,
	ImportFormatDateInvalidError: () => ImportFormatDateInvalidError,
	ImportFormatUnrecognizedError: () => ImportFormatUnrecognizedError,
	ImportIdInvalidError: () => ImportIdInvalidError,
	ImportTokenInvalidError: () => ImportTokenInvalidError,
	InlineBotRequiredError: () => InlineBotRequiredError,
	InlineResultExpiredError: () => InlineResultExpiredError,
	InputChatlistInvalidError: () => InputChatlistInvalidError,
	InputConstructorInvalidError: () => InputConstructorInvalidError,
	InputFetchErrorError: () => InputFetchErrorError,
	InputFetchFailError: () => InputFetchFailError,
	InputFileInvalidError: () => InputFileInvalidError,
	InputFilterInvalidError: () => InputFilterInvalidError,
	InputLayerInvalidError: () => InputLayerInvalidError,
	InputMethodInvalidError: () => InputMethodInvalidError,
	InputPeersEmptyError: () => InputPeersEmptyError,
	InputPurposeInvalidError: () => InputPurposeInvalidError,
	InputRequestTooLongError: () => InputRequestTooLongError,
	InputStarsAmountInvalidError: () => InputStarsAmountInvalidError,
	InputStarsNanosInvalidError: () => InputStarsNanosInvalidError,
	InputTextEmptyError: () => InputTextEmptyError,
	InputTextTooLongError: () => InputTextTooLongError,
	InputUserDeactivatedError: () => InputUserDeactivatedError,
	InterdcCallErrorError: () => InterdcCallErrorError,
	InterdcCallRichErrorError: () => InterdcCallRichErrorError,
	InviteForbiddenWithJoinasError: () => InviteForbiddenWithJoinasError,
	InviteHashEmptyError: () => InviteHashEmptyError,
	InviteHashExpiredError: () => InviteHashExpiredError,
	InviteHashInvalidError: () => InviteHashInvalidError,
	InviteRequestSentError: () => InviteRequestSentError,
	InviteRevokedMissingError: () => InviteRevokedMissingError,
	InviteSlugEmptyError: () => InviteSlugEmptyError,
	InviteSlugExpiredError: () => InviteSlugExpiredError,
	InviteSlugInvalidError: () => InviteSlugInvalidError,
	InvitesTooMuchError: () => InvitesTooMuchError,
	InvoiceInvalidError: () => InvoiceInvalidError,
	InvoicePayloadInvalidError: () => InvoicePayloadInvalidError,
	JoinAsPeerInvalidError: () => JoinAsPeerInvalidError,
	LangCodeInvalidError: () => LangCodeInvalidError,
	LangCodeNotSupportedError: () => LangCodeNotSupportedError,
	LangPackInvalidError: () => LangPackInvalidError,
	LanguageInvalidError: () => LanguageInvalidError,
	LastnameInvalidError: () => LastnameInvalidError,
	LimitInvalidError: () => LimitInvalidError,
	LimitPerPostInvalidError: () => LimitPerPostInvalidError,
	LinkNotModifiedError: () => LinkNotModifiedError,
	LocationInvalidError: () => LocationInvalidError,
	ManagerInvalidError: () => ManagerInvalidError,
	ManagerPermissionMissingError: () => ManagerPermissionMissingError,
	MaxDateInvalidError: () => MaxDateInvalidError,
	MaxIdInvalidError: () => MaxIdInvalidError,
	MaxQtsInvalidError: () => MaxQtsInvalidError,
	Md5ChecksumInvalidError: () => Md5ChecksumInvalidError,
	MediaAlreadyPaidError: () => MediaAlreadyPaidError,
	MediaCaptionTooLongError: () => MediaCaptionTooLongError,
	MediaEmptyError: () => MediaEmptyError,
	MediaFileInvalidError: () => MediaFileInvalidError,
	MediaGroupedInvalidError: () => MediaGroupedInvalidError,
	MediaInvalidError: () => MediaInvalidError,
	MediaNewInvalidError: () => MediaNewInvalidError,
	MediaPrevInvalidError: () => MediaPrevInvalidError,
	MediaTtlInvalidError: () => MediaTtlInvalidError,
	MediaTypeInvalidError: () => MediaTypeInvalidError,
	MediaVideoStoryMissingError: () => MediaVideoStoryMissingError,
	MegagroupGeoRequiredError: () => MegagroupGeoRequiredError,
	MegagroupIdInvalidError: () => MegagroupIdInvalidError,
	MegagroupPrehistoryHiddenError: () => MegagroupPrehistoryHiddenError,
	MegagroupRequiredError: () => MegagroupRequiredError,
	MemberNoLocationError: () => MemberNoLocationError,
	MemberOccupyPrimaryLocFailedError: () => MemberOccupyPrimaryLocFailedError,
	MessageAuthorRequiredError: () => MessageAuthorRequiredError,
	MessageDeleteForbiddenError: () => MessageDeleteForbiddenError,
	MessageEditTimeExpiredError: () => MessageEditTimeExpiredError,
	MessageEmptyError: () => MessageEmptyError,
	MessageIdInvalidError: () => MessageIdInvalidError,
	MessageIdsEmptyError: () => MessageIdsEmptyError,
	MessageNotModifiedError: () => MessageNotModifiedError,
	MessageNotReadYetError: () => MessageNotReadYetError,
	MessagePollClosedError: () => MessagePollClosedError,
	MessageRequiredError: () => MessageRequiredError,
	MessageTooLongError: () => MessageTooLongError,
	MessageTooOldError: () => MessageTooOldError,
	MethodInvalidError: () => MethodInvalidError,
	MinDateInvalidError: () => MinDateInvalidError,
	MonthInvalidError: () => MonthInvalidError,
	MsgIdInvalidError: () => MsgIdInvalidError,
	MsgTooOldError: () => MsgTooOldError,
	MsgVoiceMissingError: () => MsgVoiceMissingError,
	MsgVoiceTooLongError: () => MsgVoiceTooLongError,
	MsgWaitError: () => MsgWaitError,
	MsgWaitTimeoutError: () => MsgWaitTimeoutError,
	MsgidDecreaseRetryError: () => MsgidDecreaseRetryError,
	MtSendQueueTooLongError: () => MtSendQueueTooLongError,
	MultiMediaTooLongError: () => MultiMediaTooLongError,
	NameInvalidError: () => NameInvalidError,
	NeedActionMissingError: () => NeedActionMissingError,
	NeedChatInvalidError: () => NeedChatInvalidError,
	NeedMemberInvalidError: () => NeedMemberInvalidError,
	NetworkMigrateError: () => NetworkMigrateError,
	NewSaltInvalidError: () => NewSaltInvalidError,
	NewSettingsEmptyError: () => NewSettingsEmptyError,
	NewSettingsInvalidError: () => NewSettingsInvalidError,
	NextOffsetInvalidError: () => NextOffsetInvalidError,
	NoPaymentNeededError: () => NoPaymentNeededError,
	NogeneralHideForbiddenError: () => NogeneralHideForbiddenError,
	NotAllowedError: () => NotAllowedError,
	NotEligibleError: () => NotEligibleError,
	NotJoinedError: () => NotJoinedError,
	OauthRequestInvalidError: () => OauthRequestInvalidError,
	OffsetInvalidError: () => OffsetInvalidError,
	OffsetPeerIdInvalidError: () => OffsetPeerIdInvalidError,
	OptionInvalidError: () => OptionInvalidError,
	OptionsTooMuchError: () => OptionsTooMuchError,
	OrderInvalidError: () => OrderInvalidError,
	PackShortNameInvalidError: () => PackShortNameInvalidError,
	PackShortNameOccupiedError: () => PackShortNameOccupiedError,
	PackTitleInvalidError: () => PackTitleInvalidError,
	PackTypeInvalidError: () => PackTypeInvalidError,
	ParentPeerInvalidError: () => ParentPeerInvalidError,
	ParticipantCallFailedError: () => ParticipantCallFailedError,
	ParticipantIdInvalidError: () => ParticipantIdInvalidError,
	ParticipantJoinMissingError: () => ParticipantJoinMissingError,
	ParticipantVersionOutdatedError: () => ParticipantVersionOutdatedError,
	ParticipantsTooFewError: () => ParticipantsTooFewError,
	PasskeyOriginMismatchError: () => PasskeyOriginMismatchError,
	PasswordEmptyError: () => PasswordEmptyError,
	PasswordHashInvalidError: () => PasswordHashInvalidError,
	PasswordMissingError: () => PasswordMissingError,
	PasswordRecoveryExpiredError: () => PasswordRecoveryExpiredError,
	PasswordRecoveryNaError: () => PasswordRecoveryNaError,
	PasswordRequiredError: () => PasswordRequiredError,
	PasswordTooFreshError: () => PasswordTooFreshError,
	PaymentCredentialsInvalidError: () => PaymentCredentialsInvalidError,
	PaymentProviderInvalidError: () => PaymentProviderInvalidError,
	PaymentRequiredError: () => PaymentRequiredError,
	PaymentUnsupportedError: () => PaymentUnsupportedError,
	PeerFloodError: () => PeerFloodError,
	PeerHistoryEmptyError: () => PeerHistoryEmptyError,
	PeerIdInvalidError: () => PeerIdInvalidError,
	PeerIdNotSupportedError: () => PeerIdNotSupportedError,
	PeerTypesInvalidError: () => PeerTypesInvalidError,
	PeersListEmptyError: () => PeersListEmptyError,
	PersistentTimestampEmptyError: () => PersistentTimestampEmptyError,
	PersistentTimestampInvalidError: () => PersistentTimestampInvalidError,
	PersistentTimestampOutdatedError: () => PersistentTimestampOutdatedError,
	PhoneCodeEmptyError: () => PhoneCodeEmptyError,
	PhoneCodeExpiredError: () => PhoneCodeExpiredError,
	PhoneCodeHashEmptyError: () => PhoneCodeHashEmptyError,
	PhoneCodeInvalidError: () => PhoneCodeInvalidError,
	PhoneHashExpiredError: () => PhoneHashExpiredError,
	PhoneMigrateError: () => PhoneMigrateError,
	PhoneNotOccupiedError: () => PhoneNotOccupiedError,
	PhoneNumberAppSignupForbiddenError: () => PhoneNumberAppSignupForbiddenError,
	PhoneNumberBannedError: () => PhoneNumberBannedError,
	PhoneNumberFloodError: () => PhoneNumberFloodError,
	PhoneNumberInvalidError: () => PhoneNumberInvalidError,
	PhoneNumberOccupiedError: () => PhoneNumberOccupiedError,
	PhoneNumberUnoccupiedError: () => PhoneNumberUnoccupiedError,
	PhonePasswordFloodError: () => PhonePasswordFloodError,
	PhonePasswordProtectedError: () => PhonePasswordProtectedError,
	PhotoContentTypeInvalidError: () => PhotoContentTypeInvalidError,
	PhotoContentUrlEmptyError: () => PhotoContentUrlEmptyError,
	PhotoCropFileMissingError: () => PhotoCropFileMissingError,
	PhotoCropSizeSmallError: () => PhotoCropSizeSmallError,
	PhotoExtInvalidError: () => PhotoExtInvalidError,
	PhotoFileMissingError: () => PhotoFileMissingError,
	PhotoIdInvalidError: () => PhotoIdInvalidError,
	PhotoInvalidDimensionsError: () => PhotoInvalidDimensionsError,
	PhotoInvalidError: () => PhotoInvalidError,
	PhotoSaveFileInvalidError: () => PhotoSaveFileInvalidError,
	PhotoThumbUrlEmptyError: () => PhotoThumbUrlEmptyError,
	PinRestrictedError: () => PinRestrictedError,
	PinnedDialogsTooMuchError: () => PinnedDialogsTooMuchError,
	PinnedTooMuchError: () => PinnedTooMuchError,
	PinnedTopicNotModifiedError: () => PinnedTopicNotModifiedError,
	PollAnswerInvalidError: () => PollAnswerInvalidError,
	PollAnswersInvalidError: () => PollAnswersInvalidError,
	PollCountryRestrictedError: () => PollCountryRestrictedError,
	PollMemberRestrictedError: () => PollMemberRestrictedError,
	PollOptionDuplicateError: () => PollOptionDuplicateError,
	PollOptionInvalidError: () => PollOptionInvalidError,
	PollQuestionInvalidError: () => PollQuestionInvalidError,
	PollUnsupportedError: () => PollUnsupportedError,
	PollVoteRequiredError: () => PollVoteRequiredError,
	PostponedTimeoutError: () => PostponedTimeoutError,
	PrecheckoutFailedError: () => PrecheckoutFailedError,
	PremiumAccountRequiredError: () => PremiumAccountRequiredError,
	PremiumCurrentlyUnavailableError: () => PremiumCurrentlyUnavailableError,
	PremiumPurposeInvalidError: () => PremiumPurposeInvalidError,
	PremiumSubActiveUntilError: () => PremiumSubActiveUntilError,
	PreviousChatImportActiveWaitMinError: () => PreviousChatImportActiveWaitMinError,
	PreviousChatImportActiveWaitXminError: () => PreviousChatImportActiveWaitXminError,
	PricingChatInvalidError: () => PricingChatInvalidError,
	PrivacyKeyInvalidError: () => PrivacyKeyInvalidError,
	PrivacyPremiumRequiredError: () => PrivacyPremiumRequiredError,
	PrivacyTooLongError: () => PrivacyTooLongError,
	PrivacyValueInvalidError: () => PrivacyValueInvalidError,
	PtsChangeEmptyError: () => PtsChangeEmptyError,
	PublicBroadcastExpectedError: () => PublicBroadcastExpectedError,
	PublicChannelMissingError: () => PublicChannelMissingError,
	PublicKeyInvalidError: () => PublicKeyInvalidError,
	PublicKeyRequiredError: () => PublicKeyRequiredError,
	PurposeInvalidError: () => PurposeInvalidError,
	QueryIdEmptyError: () => QueryIdEmptyError,
	QueryIdInvalidError: () => QueryIdInvalidError,
	QueryTooShortError: () => QueryTooShortError,
	QuickRepliesBotNotAllowedError: () => QuickRepliesBotNotAllowedError,
	QuickRepliesTooMuchError: () => QuickRepliesTooMuchError,
	QuizAnswerMissingError: () => QuizAnswerMissingError,
	QuizCorrectAnswerInvalidError: () => QuizCorrectAnswerInvalidError,
	QuizCorrectAnswersEmptyError: () => QuizCorrectAnswersEmptyError,
	QuizCorrectAnswersTooMuchError: () => QuizCorrectAnswersTooMuchError,
	QuizMultipleInvalidError: () => QuizMultipleInvalidError,
	QuoteTextInvalidError: () => QuoteTextInvalidError,
	RaiseHandForbiddenError: () => RaiseHandForbiddenError,
	RandomIdDuplicateError: () => RandomIdDuplicateError,
	RandomIdEmptyError: () => RandomIdEmptyError,
	RandomIdExpiredError: () => RandomIdExpiredError,
	RandomIdInvalidError: () => RandomIdInvalidError,
	RandomLengthInvalidError: () => RandomLengthInvalidError,
	RangesInvalidError: () => RangesInvalidError,
	ReactionEmptyError: () => ReactionEmptyError,
	ReactionInvalidError: () => ReactionInvalidError,
	ReactionsCountInvalidError: () => ReactionsCountInvalidError,
	ReactionsTooManyError: () => ReactionsTooManyError,
	ReceiptEmptyError: () => ReceiptEmptyError,
	ReflectorNotAvailableError: () => ReflectorNotAvailableError,
	RegIdGenerateFailedError: () => RegIdGenerateFailedError,
	ReplyMarkupBuyEmptyError: () => ReplyMarkupBuyEmptyError,
	ReplyMarkupGameEmptyError: () => ReplyMarkupGameEmptyError,
	ReplyMarkupInvalidError: () => ReplyMarkupInvalidError,
	ReplyMarkupTooLongError: () => ReplyMarkupTooLongError,
	ReplyMessageIdInvalidError: () => ReplyMessageIdInvalidError,
	ReplyMessagesTooMuchError: () => ReplyMessagesTooMuchError,
	ReplyToInvalidError: () => ReplyToInvalidError,
	ReplyToMonoforumPeerInvalidError: () => ReplyToMonoforumPeerInvalidError,
	ReplyToUserInvalidError: () => ReplyToUserInvalidError,
	RequestMsgExpiredError: () => RequestMsgExpiredError,
	RequestTokenInvalidError: () => RequestTokenInvalidError,
	ResellStarsTooFewError: () => ResellStarsTooFewError,
	ResellStarsTooMuchError: () => ResellStarsTooMuchError,
	ResetRequestMissingError: () => ResetRequestMissingError,
	ResultIdDuplicateError: () => ResultIdDuplicateError,
	ResultIdEmptyError: () => ResultIdEmptyError,
	ResultIdInvalidError: () => ResultIdInvalidError,
	ResultTypeInvalidError: () => ResultTypeInvalidError,
	ResultsTooMuchError: () => ResultsTooMuchError,
	RevoteNotAllowedError: () => RevoteNotAllowedError,
	RightForbiddenError: () => RightForbiddenError,
	RightsNotModifiedError: () => RightsNotModifiedError,
	RingtoneInvalidError: () => RingtoneInvalidError,
	RingtoneMimeInvalidError: () => RingtoneMimeInvalidError,
	RpcCallFailError: () => RpcCallFailError,
	RpcMcgetFailError: () => RpcMcgetFailError,
	RsaDecryptFailedError: () => RsaDecryptFailedError,
	SavedIdEmptyError: () => SavedIdEmptyError,
	ScheduleBotNotAllowedError: () => ScheduleBotNotAllowedError,
	ScheduleDateInvalidError: () => ScheduleDateInvalidError,
	ScheduleDateTooLateError: () => ScheduleDateTooLateError,
	ScheduleStatusPrivateError: () => ScheduleStatusPrivateError,
	ScheduleTooMuchError: () => ScheduleTooMuchError,
	ScoreInvalidError: () => ScoreInvalidError,
	SearchQueryEmptyError: () => SearchQueryEmptyError,
	SearchWithLinkNotSupportedError: () => SearchWithLinkNotSupportedError,
	SecondsInvalidError: () => SecondsInvalidError,
	SecureSecretRequiredError: () => SecureSecretRequiredError,
	SelfDeleteRestrictedError: () => SelfDeleteRestrictedError,
	SendAsPeerInvalidError: () => SendAsPeerInvalidError,
	SendCodeUnavailableError: () => SendCodeUnavailableError,
	SendMediaInvalidError: () => SendMediaInvalidError,
	SendMessageGameInvalidError: () => SendMessageGameInvalidError,
	SendMessageMediaInvalidError: () => SendMessageMediaInvalidError,
	SendMessageTypeInvalidError: () => SendMessageTypeInvalidError,
	SensitiveChangeForbiddenError: () => SensitiveChangeForbiddenError,
	SessionExpiredError: () => SessionExpiredError,
	SessionPasswordNeededError: () => SessionPasswordNeededError,
	SessionRevokedError: () => SessionRevokedError,
	SessionTooFreshError: () => SessionTooFreshError,
	SettingsInvalidError: () => SettingsInvalidError,
	Sha256HashInvalidError: () => Sha256HashInvalidError,
	ShortNameInvalidError: () => ShortNameInvalidError,
	ShortNameOccupiedError: () => ShortNameOccupiedError,
	ShortcutInvalidError: () => ShortcutInvalidError,
	ShortnameOccupyFailedError: () => ShortnameOccupyFailedError,
	SignInFailedError: () => SignInFailedError,
	SlotsEmptyError: () => SlotsEmptyError,
	SlowModeWaitError: () => SlowModeWaitError,
	SlowmodeMultiMsgsDisabledError: () => SlowmodeMultiMsgsDisabledError,
	SlugInvalidError: () => SlugInvalidError,
	SmsCodeCreateFailedError: () => SmsCodeCreateFailedError,
	SmsjobIdInvalidError: () => SmsjobIdInvalidError,
	SrpAInvalidError: () => SrpAInvalidError,
	SrpIdInvalidError: () => SrpIdInvalidError,
	SrpPasswordChangedError: () => SrpPasswordChangedError,
	StargiftAlreadyConvertedError: () => StargiftAlreadyConvertedError,
	StargiftAlreadyRefundedError: () => StargiftAlreadyRefundedError,
	StargiftAlreadyUpgradedError: () => StargiftAlreadyUpgradedError,
	StargiftAttributeInvalidError: () => StargiftAttributeInvalidError,
	StargiftExportInProgressError: () => StargiftExportInProgressError,
	StargiftInvalidError: () => StargiftInvalidError,
	StargiftMessageInvalidError: () => StargiftMessageInvalidError,
	StargiftNotFoundError: () => StargiftNotFoundError,
	StargiftNotOwnerError: () => StargiftNotOwnerError,
	StargiftNotUniqueError: () => StargiftNotUniqueError,
	StargiftObjectInvalidError: () => StargiftObjectInvalidError,
	StargiftOfferInvalidError: () => StargiftOfferInvalidError,
	StargiftOfferNotAllowedError: () => StargiftOfferNotAllowedError,
	StargiftOwnerInvalidError: () => StargiftOwnerInvalidError,
	StargiftPeerInvalidError: () => StargiftPeerInvalidError,
	StargiftResellCurrencyNotAllowedError: () => StargiftResellCurrencyNotAllowedError,
	StargiftResellTooEarlyError: () => StargiftResellTooEarlyError,
	StargiftSlugInvalidError: () => StargiftSlugInvalidError,
	StargiftTransferTooEarlyError: () => StargiftTransferTooEarlyError,
	StargiftUpgradeUnavailableError: () => StargiftUpgradeUnavailableError,
	StargiftUsageLimitedError: () => StargiftUsageLimitedError,
	StargiftUserUsageLimitedError: () => StargiftUserUsageLimitedError,
	StarrefAwaitingEndError: () => StarrefAwaitingEndError,
	StarrefExpiredError: () => StarrefExpiredError,
	StarrefHashRevokedError: () => StarrefHashRevokedError,
	StarrefPermilleInvalidError: () => StarrefPermilleInvalidError,
	StarrefPermilleTooLowError: () => StarrefPermilleTooLowError,
	StarsAmountInvalidError: () => StarsAmountInvalidError,
	StarsFormAmountMismatchError: () => StarsFormAmountMismatchError,
	StarsInvoiceInvalidError: () => StarsInvoiceInvalidError,
	StarsPaymentRequiredError: () => StarsPaymentRequiredError,
	StartParamEmptyError: () => StartParamEmptyError,
	StartParamInvalidError: () => StartParamInvalidError,
	StartParamTooLongError: () => StartParamTooLongError,
	StatsMigrateError: () => StatsMigrateError,
	StickerDocumentInvalidError: () => StickerDocumentInvalidError,
	StickerEmojiInvalidError: () => StickerEmojiInvalidError,
	StickerFileInvalidError: () => StickerFileInvalidError,
	StickerGifDimensionsError: () => StickerGifDimensionsError,
	StickerIdInvalidError: () => StickerIdInvalidError,
	StickerInvalidError: () => StickerInvalidError,
	StickerMimeInvalidError: () => StickerMimeInvalidError,
	StickerPngDimensionsError: () => StickerPngDimensionsError,
	StickerPngNopngError: () => StickerPngNopngError,
	StickerTgsNodocError: () => StickerTgsNodocError,
	StickerTgsNotgsError: () => StickerTgsNotgsError,
	StickerThumbPngNopngError: () => StickerThumbPngNopngError,
	StickerThumbTgsNotgsError: () => StickerThumbTgsNotgsError,
	StickerVideoBigError: () => StickerVideoBigError,
	StickerVideoNodocError: () => StickerVideoNodocError,
	StickerVideoNowebmError: () => StickerVideoNowebmError,
	StickerpackStickersTooMuchError: () => StickerpackStickersTooMuchError,
	StickersEmptyError: () => StickersEmptyError,
	StickersTooMuchError: () => StickersTooMuchError,
	StickersetInvalidError: () => StickersetInvalidError,
	StickersetNotModifiedError: () => StickersetNotModifiedError,
	StickersetOwnerAnonymousError: () => StickersetOwnerAnonymousError,
	StorageCheckFailedError: () => StorageCheckFailedError,
	StoreInvalidScalarTypeError: () => StoreInvalidScalarTypeError,
	StoriesNeverCreatedError: () => StoriesNeverCreatedError,
	StoriesTooMuchError: () => StoriesTooMuchError,
	StoryIdEmptyError: () => StoryIdEmptyError,
	StoryIdInvalidError: () => StoryIdInvalidError,
	StoryLiveAlreadyError: () => StoryLiveAlreadyError,
	StoryNotModifiedError: () => StoryNotModifiedError,
	StoryPeriodInvalidError: () => StoryPeriodInvalidError,
	StorySendFloodMonthlyError: () => StorySendFloodMonthlyError,
	StorySendFloodWeeklyError: () => StorySendFloodWeeklyError,
	SubscriptionExportMissingError: () => SubscriptionExportMissingError,
	SubscriptionIdInvalidError: () => SubscriptionIdInvalidError,
	SubscriptionPeriodInvalidError: () => SubscriptionPeriodInvalidError,
	SuggestedPostAmountInvalidError: () => SuggestedPostAmountInvalidError,
	SuggestedPostPeerInvalidError: () => SuggestedPostPeerInvalidError,
	SwitchPmTextEmptyError: () => SwitchPmTextEmptyError,
	SwitchWebviewUrlInvalidError: () => SwitchWebviewUrlInvalidError,
	TakeoutInitDelayError: () => TakeoutInitDelayError,
	TakeoutInvalidError: () => TakeoutInvalidError,
	TakeoutRequiredError: () => TakeoutRequiredError,
	TaskAlreadyExistsError: () => TaskAlreadyExistsError,
	TempAuthKeyAlreadyBoundError: () => TempAuthKeyAlreadyBoundError,
	TempAuthKeyEmptyError: () => TempAuthKeyEmptyError,
	TermsUrlInvalidError: () => TermsUrlInvalidError,
	TextdraftPeerInvalidError: () => TextdraftPeerInvalidError,
	ThemeFileInvalidError: () => ThemeFileInvalidError,
	ThemeFormatInvalidError: () => ThemeFormatInvalidError,
	ThemeInvalidError: () => ThemeInvalidError,
	ThemeMimeInvalidError: () => ThemeMimeInvalidError,
	ThemeParamsInvalidError: () => ThemeParamsInvalidError,
	ThemeSlugInvalidError: () => ThemeSlugInvalidError,
	ThemeTitleInvalidError: () => ThemeTitleInvalidError,
	TimeoutError: () => TimeoutError,
	TimezoneInvalidError: () => TimezoneInvalidError,
	TitleInvalidError: () => TitleInvalidError,
	TmpPasswordDisabledError: () => TmpPasswordDisabledError,
	TmpPasswordInvalidError: () => TmpPasswordInvalidError,
	ToIdInvalidError: () => ToIdInvalidError,
	ToLangInvalidError: () => ToLangInvalidError,
	TodoItemDuplicateError: () => TodoItemDuplicateError,
	TodoItemsEmptyError: () => TodoItemsEmptyError,
	TodoItemsTooMuchError: () => TodoItemsTooMuchError,
	TodoNotModifiedError: () => TodoNotModifiedError,
	TokenEmptyError: () => TokenEmptyError,
	TokenInvalidError: () => TokenInvalidError,
	TokenTypeInvalidError: () => TokenTypeInvalidError,
	TopicCloseSeparatelyError: () => TopicCloseSeparatelyError,
	TopicClosedError: () => TopicClosedError,
	TopicDeletedError: () => TopicDeletedError,
	TopicHideSeparatelyError: () => TopicHideSeparatelyError,
	TopicIdInvalidError: () => TopicIdInvalidError,
	TopicNotModifiedError: () => TopicNotModifiedError,
	TopicTitleEmptyError: () => TopicTitleEmptyError,
	TopicsEmptyError: () => TopicsEmptyError,
	TransactionIdInvalidError: () => TransactionIdInvalidError,
	TranscriptionFailedError: () => TranscriptionFailedError,
	TranslateReqFailedError: () => TranslateReqFailedError,
	TranslateReqQuotaExceededError: () => TranslateReqQuotaExceededError,
	TranslationTimeoutError: () => TranslationTimeoutError,
	TranslationsDisabledError: () => TranslationsDisabledError,
	TtlDaysInvalidError: () => TtlDaysInvalidError,
	TtlMediaInvalidError: () => TtlMediaInvalidError,
	TtlPeriodInvalidError: () => TtlPeriodInvalidError,
	TwoFaConfirmWaitError: () => TwoFaConfirmWaitError,
	TypeConstructorInvalidError: () => TypeConstructorInvalidError,
	TypesEmptyError: () => TypesEmptyError,
	UnknownErrorError: () => UnknownErrorError,
	UnknownMethodError: () => UnknownMethodError,
	UnsupportedError: () => UnsupportedError,
	UntilDateInvalidError: () => UntilDateInvalidError,
	UpdateAppToLoginError: () => UpdateAppToLoginError,
	UrlExpiredError: () => UrlExpiredError,
	UrlInvalidError: () => UrlInvalidError,
	UsageLimitInvalidError: () => UsageLimitInvalidError,
	UserAdminInvalidError: () => UserAdminInvalidError,
	UserAlreadyInvitedError: () => UserAlreadyInvitedError,
	UserAlreadyParticipantError: () => UserAlreadyParticipantError,
	UserBannedInChannelError: () => UserBannedInChannelError,
	UserBlockedError: () => UserBlockedError,
	UserBotError: () => UserBotError,
	UserBotInvalidError: () => UserBotInvalidError,
	UserBotRequiredError: () => UserBotRequiredError,
	UserBotToBotDisabledError: () => UserBotToBotDisabledError,
	UserChannelsTooMuchError: () => UserChannelsTooMuchError,
	UserCreatorError: () => UserCreatorError,
	UserDeactivatedBanError: () => UserDeactivatedBanError,
	UserDeactivatedError: () => UserDeactivatedError,
	UserDeletedError: () => UserDeletedError,
	UserDisallowedStargiftsError: () => UserDisallowedStargiftsError,
	UserGiftUnavailableError: () => UserGiftUnavailableError,
	UserIdInvalidError: () => UserIdInvalidError,
	UserInvalidError: () => UserInvalidError,
	UserIsBlockedError: () => UserIsBlockedError,
	UserIsBotError: () => UserIsBotError,
	UserKickedError: () => UserKickedError,
	UserMigrateError: () => UserMigrateError,
	UserNotMutualContactError: () => UserNotMutualContactError,
	UserNotParticipantError: () => UserNotParticipantError,
	UserPermissionDeniedError: () => UserPermissionDeniedError,
	UserPrivacyRestrictedError: () => UserPrivacyRestrictedError,
	UserPublicMissingError: () => UserPublicMissingError,
	UserRestrictedError: () => UserRestrictedError,
	UserVolumeInvalidError: () => UserVolumeInvalidError,
	UsernameInvalidError: () => UsernameInvalidError,
	UsernameNotModifiedError: () => UsernameNotModifiedError,
	UsernameNotOccupiedError: () => UsernameNotOccupiedError,
	UsernameOccupiedError: () => UsernameOccupiedError,
	UsernamePurchaseAvailableError: () => UsernamePurchaseAvailableError,
	UsernameSuffixMissingError: () => UsernameSuffixMissingError,
	UsernamesActiveTooMuchError: () => UsernamesActiveTooMuchError,
	UserpicPrivacyRequiredError: () => UserpicPrivacyRequiredError,
	UserpicUploadRequiredError: () => UserpicUploadRequiredError,
	UsersTooFewError: () => UsersTooFewError,
	UsersTooMuchError: () => UsersTooMuchError,
	VenueIdInvalidError: () => VenueIdInvalidError,
	VideoContentTypeInvalidError: () => VideoContentTypeInvalidError,
	VideoDurationInvalidError: () => VideoDurationInvalidError,
	VideoFileInvalidError: () => VideoFileInvalidError,
	VideoPauseForbiddenError: () => VideoPauseForbiddenError,
	VideoStopForbiddenError: () => VideoStopForbiddenError,
	VideoTitleEmptyError: () => VideoTitleEmptyError,
	VoiceMessagesForbiddenError: () => VoiceMessagesForbiddenError,
	WallpaperFileInvalidError: () => WallpaperFileInvalidError,
	WallpaperInvalidError: () => WallpaperInvalidError,
	WallpaperMimeInvalidError: () => WallpaperMimeInvalidError,
	WallpaperNotFoundError: () => WallpaperNotFoundError,
	WcConvertUrlInvalidError: () => WcConvertUrlInvalidError,
	WebappReqIdInvalidError: () => WebappReqIdInvalidError,
	WebauthTokenExpiredError: () => WebauthTokenExpiredError,
	WebdocumentInvalidError: () => WebdocumentInvalidError,
	WebdocumentMimeInvalidError: () => WebdocumentMimeInvalidError,
	WebdocumentSizeTooBigError: () => WebdocumentSizeTooBigError,
	WebdocumentUrlEmptyError: () => WebdocumentUrlEmptyError,
	WebdocumentUrlInvalidError: () => WebdocumentUrlInvalidError,
	WebpageCurlFailedError: () => WebpageCurlFailedError,
	WebpageMediaEmptyError: () => WebpageMediaEmptyError,
	WebpageNotFoundError: () => WebpageNotFoundError,
	WebpageUrlInvalidError: () => WebpageUrlInvalidError,
	WebpushAuthInvalidError: () => WebpushAuthInvalidError,
	WebpushKeyInvalidError: () => WebpushKeyInvalidError,
	WebpushTokenInvalidError: () => WebpushTokenInvalidError,
	WorkerBusyTooLongRetryError: () => WorkerBusyTooLongRetryError,
	YouBlockedUserError: () => YouBlockedUserError,
	YourPrivacyRestrictedError: () => YourPrivacyRestrictedError,
	baseErrors: () => baseErrors,
	rpcErrorRe: () => rpcErrorRe,
	rpcErrorsDict: () => rpcErrorsDict,
	rpcErrorsRe: () => rpcErrorsRe
});
/** Your IP address is associated to DC %d, please re-send the query to that DC. */
var NetworkMigrateError = class extends require_errors_RPCBaseErrors.InvalidDCError {
	constructor(args) {
		const newDc = Number(args.capture || 0);
		const message = "Your IP address is associated to DC " + newDc + ", please re-send the query to that DC." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.newDc = newDc;
	}
};
/** Your phone number is associated to DC %d, please re-send the query to that DC. */
var PhoneMigrateError = class extends require_errors_RPCBaseErrors.InvalidDCError {
	constructor(args) {
		const newDc = Number(args.capture || 0);
		const message = "Your phone number is associated to DC " + newDc + ", please re-send the query to that DC." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.newDc = newDc;
	}
};
/** Channel statistics for the specified channel are stored on DC %d, please re-send the query to that DC. */
var StatsMigrateError = class extends require_errors_RPCBaseErrors.InvalidDCError {
	constructor(args) {
		const newDc = Number(args.capture || 0);
		const message = "Channel statistics for the specified channel are stored on DC " + newDc + ", please re-send the query to that DC." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.newDc = newDc;
	}
};
/** Your account is associated to DC %d, please re-send the query to that DC. */
var UserMigrateError = class extends require_errors_RPCBaseErrors.InvalidDCError {
	constructor(args) {
		const newDc = Number(args.capture || 0);
		const message = "Your account is associated to DC " + newDc + ", please re-send the query to that DC." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.newDc = newDc;
	}
};
/** About string too long. */
var AboutTooLongError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "About string too long." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ABOUT_TOO_LONG";
	}
};
/** Access token expired. */
var AccessTokenExpiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Access token expired." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ACCESS_TOKEN_EXPIRED";
	}
};
/** Access token invalid. */
var AccessTokenInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Access token invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ACCESS_TOKEN_INVALID";
	}
};
/** The ad has expired (too old or not found). */
var AdExpiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The ad has expired (too old or not found)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "AD_EXPIRED";
	}
};
/** The specified geopoint address is invalid. */
var AddressInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified geopoint address is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ADDRESS_INVALID";
	}
};
/** The specified admin ID is invalid. */
var AdminIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified admin ID is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ADMIN_ID_INVALID";
	}
};
/** An admin rank cannot contain emojis. */
var AdminRankEmojiNotAllowedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "An admin rank cannot contain emojis." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ADMIN_RANK_EMOJI_NOT_ALLOWED";
	}
};
/** The specified admin rank is invalid. */
var AdminRankInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified admin rank is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ADMIN_RANK_INVALID";
	}
};
/** The chatAdminRights constructor passed in keyboardButtonRequestPeer.peer_type.user_admin_rights has no rights set (i.e. flags is 0). */
var AdminRightsEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The chatAdminRights constructor passed in keyboardButtonRequestPeer.peer_type.user_admin_rights has no rights set (i.e. flags is 0)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ADMIN_RIGHTS_EMPTY";
	}
};
/** There are too many admins. */
var AdminsTooMuchError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "There are too many admins." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ADMINS_TOO_MUCH";
	}
};
/** No AI task was specified. The caller must provide at least one of: proofread, translate (with a target language), tone, or emojify. */
var AiComposeTaskMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "No AI task was specified. The caller must provide at least one of: proofread, translate (with a target language), tone, or emojify." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "AI_COMPOSE_TASK_MISSING";
	}
};
/** You've reached the daily limit of AI text transformations, upgrade to [Telegram Premium](https://core.telegram.org/api/premium) to get **50x** times more AI text transformations per day! */
var AicomposeFloodPremiumError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You've reached the daily limit of AI text transformations, upgrade to [Telegram Premium](https://core.telegram.org/api/premium) to get **50x** times more AI text transformations per day!" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "AICOMPOSE_FLOOD_PREMIUM";
	}
};
/** The specified tone is invalid. */
var AicomposeToneInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified tone is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "AICOMPOSE_TONE_INVALID";
	}
};
/** The specified tone title is invalid. */
var AicomposeToneTitleInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified tone title is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "AICOMPOSE_TONE_TITLE_INVALID";
	}
};
/** You have uploaded too many profile photos, delete some before retrying. */
var AlbumPhotosTooManyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You have uploaded too many profile photos, delete some before retrying." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ALBUM_PHOTOS_TOO_MANY";
	}
};
/** API ID invalid. */
var ApiIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "API ID invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "API_ID_INVALID";
	}
};
/** This API id was published somewhere, you can't use it now. */
var ApiIdPublishedFloodError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "This API id was published somewhere, you can't use it now." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "API_ID_PUBLISHED_FLOOD";
	}
};
/** The title of the article is empty. */
var ArticleTitleEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The title of the article is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ARTICLE_TITLE_EMPTY";
	}
};
/** The remote URL specified in the content field is empty. */
var AudioContentUrlEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The remote URL specified in the content field is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "AUDIO_CONTENT_URL_EMPTY";
	}
};
/** An empty audio title was provided. */
var AudioTitleEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "An empty audio title was provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "AUDIO_TITLE_EMPTY";
	}
};
/** The provided authorization is invalid. */
var AuthBytesInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided authorization is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "AUTH_BYTES_INVALID";
	}
};
/** The specified auth token was already accepted. */
var AuthTokenAlreadyAcceptedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified auth token was already accepted." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "AUTH_TOKEN_ALREADY_ACCEPTED";
	}
};
/** An error occurred while importing the auth token. */
var AuthTokenExceptionError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "An error occurred while importing the auth token." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "AUTH_TOKEN_EXCEPTION";
	}
};
/** The authorization token has expired. */
var AuthTokenExpiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The authorization token has expired." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "AUTH_TOKEN_EXPIRED";
	}
};
/** The specified auth token is invalid. */
var AuthTokenInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified auth token is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "AUTH_TOKEN_INVALID";
	}
};
/** The specified auth token is invalid. */
var AuthTokenInvalidxError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified auth token is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "AUTH_TOKEN_INVALIDX";
	}
};
/** The autoarchive setting is not available at this time: please check the value of the [autoarchive_setting_available field in client config &raquo;](https://core.telegram.org/api/config#client-configuration) before calling this method. */
var AutoarchiveNotAvailableError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The autoarchive setting is not available at this time: please check the value of the [autoarchive_setting_available field in client config &raquo;](https://core.telegram.org/api/config#client-configuration) before calling this method." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "AUTOARCHIVE_NOT_AVAILABLE";
	}
};
/** The transaction cannot be completed because the current [Telegram Stars balance](https://core.telegram.org/api/stars) is too low. */
var BalanceTooLowError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The transaction cannot be completed because the current [Telegram Stars balance](https://core.telegram.org/api/stars) is too low." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BALANCE_TOO_LOW";
	}
};
/** The specified card number is invalid. */
var BankCardNumberInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified card number is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BANK_CARD_NUMBER_INVALID";
	}
};
/** You provided some invalid flags in the banned rights. */
var BannedRightsInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You provided some invalid flags in the banned rights." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BANNED_RIGHTS_INVALID";
	}
};
/** The target user already has a birthday set. */
var BirthdayAlreadyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The target user already has a birthday set." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BIRTHDAY_ALREADY";
	}
};
/** An invalid age was specified, must be between 0 and 150 years. */
var BirthdayInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "An invalid age was specified, must be between 0 and 150 years." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BIRTHDAY_INVALID";
	}
};
/** You're already [boosting](https://core.telegram.org/api/boost) the specified channel. */
var BoostNotModifiedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You're already [boosting](https://core.telegram.org/api/boost) the specified channel." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOOST_NOT_MODIFIED";
	}
};
/** The specified `boost_peer` is invalid. */
var BoostPeerInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified `boost_peer` is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOOST_PEER_INVALID";
	}
};
/** No boost slots were specified. */
var BoostsEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "No boost slots were specified." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOOSTS_EMPTY";
	}
};
/** The specified channel must first be [boosted by its users](https://core.telegram.org/api/boost) in order to perform this action. */
var BoostsRequiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified channel must first be [boosted by its users](https://core.telegram.org/api/boost) in order to perform this action." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOOSTS_REQUIRED";
	}
};
/** The connected business bot was already disabled for the specified peer. */
var BotAlreadyDisabledError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The connected business bot was already disabled for the specified peer." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_ALREADY_DISABLED";
	}
};
/** The bot_id passed in the inputBotAppShortName constructor is invalid. */
var BotAppBotInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The bot_id passed in the inputBotAppShortName constructor is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_APP_BOT_INVALID";
	}
};
/** The specified bot app is invalid. */
var BotAppInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified bot app is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_APP_INVALID";
	}
};
/** The specified bot app short name is invalid. */
var BotAppShortnameInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified bot app short name is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_APP_SHORTNAME_INVALID";
	}
};
/** The specified bot is not a business bot (the [user](https://core.telegram.org/constructor/user).`bot_business` flag is not set). */
var BotBusinessMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified bot is not a business bot (the [user](https://core.telegram.org/constructor/user).`bot_business` flag is not set)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_BUSINESS_MISSING";
	}
};
/** Bots can't edit admin privileges. */
var BotChannelsNaError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Bots can't edit admin privileges." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_CHANNELS_NA";
	}
};
/** The specified command description is invalid. */
var BotCommandDescriptionInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified command description is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_COMMAND_DESCRIPTION_INVALID";
	}
};
/** The specified command is invalid. */
var BotCommandInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified command is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_COMMAND_INVALID";
	}
};
/** The current user already owns the maximum allowed number of owned bots, as specified by [`bots_create_limit_default` &raquo;](https://core.telegram.org/api/config#bots-create-limit-default) and [`bots_create_limit_premium` &raquo;](https://core.telegram.org/api/config#bots-create-limit-premium); if the current user doesn't have Telegram Premium, upgrading to Premium will allow them to create more bots. */
var BotCreateLimitExceededError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The current user already owns the maximum allowed number of owned bots, as specified by [`bots_create_limit_default` &raquo;](https://core.telegram.org/api/config#bots-create-limit-default) and [`bots_create_limit_premium` &raquo;](https://core.telegram.org/api/config#bots-create-limit-premium); if the current user doesn't have Telegram Premium, upgrading to Premium will allow them to create more bots." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_CREATE_LIMIT_EXCEEDED";
	}
};
/** Bot domain invalid. */
var BotDomainInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Bot domain invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_DOMAIN_INVALID";
	}
};
/** The fallback flag can't be set for bots. */
var BotFallbackUnsupportedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The fallback flag can't be set for bots." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_FALLBACK_UNSUPPORTED";
	}
};
/** Games can't be sent to channels. */
var BotGamesDisabledError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Games can't be sent to channels." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_GAMES_DISABLED";
	}
};
/** This bot can't be added to groups. */
var BotGroupsBlockedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "This bot can't be added to groups." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_GROUPS_BLOCKED";
	}
};
/** The specified bot ID is invalid. */
var BotIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified bot ID is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_ID_INVALID";
	}
};
/** This bot can't be used in inline mode. */
var BotInlineDisabledError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "This bot can't be used in inline mode." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_INLINE_DISABLED";
	}
};
/** This is not a valid bot. */
var BotInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "This is not a valid bot." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_INVALID";
	}
};
/** The specified invoice is invalid. */
var BotInvoiceInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified invoice is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_INVOICE_INVALID";
	}
};
/** No [business bot](https://core.telegram.org/api/business#connected-bots) is connected to the currently logged in user. */
var BotNotConnectedYetError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "No [business bot](https://core.telegram.org/api/business#connected-bots) is connected to the currently logged in user." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_NOT_CONNECTED_YET";
	}
};
/** Bots can't pin messages in PM just for themselves. */
var BotOnesideNotAvailError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Bots can't pin messages in PM just for themselves." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_ONESIDE_NOT_AVAIL";
	}
};
/** Please enable bot payments in botfather before calling this method. */
var BotPaymentsDisabledError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Please enable bot payments in botfather before calling this method." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_PAYMENTS_DISABLED";
	}
};
/** A timeout occurred while fetching data from the bot. */
var BotResponseTimeoutError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "A timeout occurred while fetching data from the bot." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_RESPONSE_TIMEOUT";
	}
};
/** The score wasn't modified. */
var BotScoreNotModifiedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The score wasn't modified." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_SCORE_NOT_MODIFIED";
	}
};
/** A webview cannot be opened in the specified conditions: emitted for example if `from_bot_menu` or `url` are set and `peer` is not the chat with the bot. */
var BotWebviewDisabledError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "A webview cannot be opened in the specified conditions: emitted for example if `from_bot_menu` or `url` are set and `peer` is not the chat with the bot." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_WEBVIEW_DISABLED";
	}
};
/** There are too many bots in this chat/channel. */
var BotsTooMuchError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "There are too many bots in this chat/channel." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOTS_TOO_MUCH";
	}
};
/** Broadcast ID invalid. */
var BroadcastIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Broadcast ID invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BROADCAST_ID_INVALID";
	}
};
/** You can't forward polls with public voters. */
var BroadcastPublicVotersForbiddenError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You can't forward polls with public voters." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BROADCAST_PUBLIC_VOTERS_FORBIDDEN";
	}
};
/** This method can only be called on a channel, please use stats.getMegagroupStats for supergroups. */
var BroadcastRequiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "This method can only be called on a channel, please use stats.getMegagroupStats for supergroups." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BROADCAST_REQUIRED";
	}
};
/** The `connection_id` passed to the wrapping [invokeWithBusinessConnection](https://core.telegram.org/api/business) call is invalid. */
var BusinessConnectionInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The `connection_id` passed to the wrapping [invokeWithBusinessConnection](https://core.telegram.org/api/business) call is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BUSINESS_CONNECTION_INVALID";
	}
};
/** This method was invoked over a business connection using [invokeWithBusinessConnection](https://core.telegram.org/api/business#connected-bots), but either (1) we're a user, and users cannot invoke methods over a business connection; (2) we're a bot, but business mode was disabled in \@botfather or (3); we're a bot, but this method cannot be invoked over a business connection. */
var BusinessConnectionNotAllowedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "This method was invoked over a business connection using [invokeWithBusinessConnection](https://core.telegram.org/api/business#connected-bots), but either (1) we're a user, and users cannot invoke methods over a business connection; (2) we're a bot, but business mode was disabled in @botfather or (3); we're a bot, but this method cannot be invoked over a business connection." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BUSINESS_CONNECTION_NOT_ALLOWED";
	}
};
/** Messages can't be set to the specified peer through the current [business connection](https://core.telegram.org/api/business#connected-bots). */
var BusinessPeerInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Messages can't be set to the specified peer through the current [business connection](https://core.telegram.org/api/business#connected-bots)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BUSINESS_PEER_INVALID";
	}
};
/** You cannot send a message to a user through a [business connection](https://core.telegram.org/api/business#connected-bots) if the user hasn't recently contacted us. */
var BusinessPeerUsageMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You cannot send a message to a user through a [business connection](https://core.telegram.org/api/business#connected-bots) if the user hasn't recently contacted us." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BUSINESS_PEER_USAGE_MISSING";
	}
};
/** You didn't set any flag in inputBusinessBotRecipients, thus the bot cannot work with *any* peer. */
var BusinessRecipientsEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You didn't set any flag in inputBusinessBotRecipients, thus the bot cannot work with *any* peer." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BUSINESS_RECIPIENTS_EMPTY";
	}
};
/** No work hours were specified. */
var BusinessWorkHoursEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "No work hours were specified." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BUSINESS_WORK_HOURS_EMPTY";
	}
};
/** The specified work hours are invalid, see [here &raquo;](https://core.telegram.org/api/business#opening-hours) for the exact requirements. */
var BusinessWorkHoursPeriodInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified work hours are invalid, see [here &raquo;](https://core.telegram.org/api/business#opening-hours) for the exact requirements." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BUSINESS_WORK_HOURS_PERIOD_INVALID";
	}
};
/** The specified [keyboardButtonCopy](https://core.telegram.org/constructor/keyboardButtonCopy).`copy_text` is invalid. */
var ButtonCopyTextInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified [keyboardButtonCopy](https://core.telegram.org/constructor/keyboardButtonCopy).`copy_text` is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BUTTON_COPY_TEXT_INVALID";
	}
};
/** The data of one or more of the buttons you provided is invalid. */
var ButtonDataInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The data of one or more of the buttons you provided is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BUTTON_DATA_INVALID";
	}
};
/** The specified button ID is invalid. */
var ButtonIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified button ID is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BUTTON_ID_INVALID";
	}
};
/** The specified button is invalid. */
var ButtonInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified button is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BUTTON_INVALID";
	}
};
/** The position of one of the keyboard buttons is invalid (i.e. a Game or Pay button not in the first position, and so on...). */
var ButtonPosInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The position of one of the keyboard buttons is invalid (i.e. a Game or Pay button not in the first position, and so on...)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BUTTON_POS_INVALID";
	}
};
/** The specified button text is invalid. */
var ButtonTextInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified button text is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BUTTON_TEXT_INVALID";
	}
};
/** The type of one or more of the buttons you provided is invalid. */
var ButtonTypeInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The type of one or more of the buttons you provided is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BUTTON_TYPE_INVALID";
	}
};
/** Button URL invalid. */
var ButtonUrlInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Button URL invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BUTTON_URL_INVALID";
	}
};
/** The `user_id` passed to inputKeyboardButtonUserProfile is invalid! */
var ButtonUserInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The `user_id` passed to inputKeyboardButtonUserProfile is invalid!" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BUTTON_USER_INVALID";
	}
};
/** The privacy setting of the user specified in a [inputKeyboardButtonUserProfile](https://core.telegram.org/constructor/inputKeyboardButtonUserProfile) button do not allow creating such a button. */
var ButtonUserPrivacyRestrictedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The privacy setting of the user specified in a [inputKeyboardButtonUserProfile](https://core.telegram.org/constructor/inputKeyboardButtonUserProfile) button do not allow creating such a button." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BUTTON_USER_PRIVACY_RESTRICTED";
	}
};
/** The call was already accepted. */
var CallAlreadyAcceptedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The call was already accepted." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CALL_ALREADY_ACCEPTED";
	}
};
/** The call was already declined. */
var CallAlreadyDeclinedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The call was already declined." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CALL_ALREADY_DECLINED";
	}
};
/** The specified call is not active. */
var CallNotActiveError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified call is not active." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CALL_NOT_ACTIVE";
	}
};
/** The call failed because the user is already making another call. */
var CallOccupyFailedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The call failed because the user is already making another call." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CALL_OCCUPY_FAILED";
	}
};
/** The provided call peer object is invalid. */
var CallPeerInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided call peer object is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CALL_PEER_INVALID";
	}
};
/** Call protocol flags invalid. */
var CallProtocolFlagsInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Call protocol flags invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CALL_PROTOCOL_FLAGS_INVALID";
	}
};
/** The specified protocol layer version range is invalid. */
var CallProtocolLayerInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified protocol layer version range is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CALL_PROTOCOL_LAYER_INVALID";
	}
};
/** You can't call this method in a CDN DC. */
var CdnMethodInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You can't call this method in a CDN DC." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CDN_METHOD_INVALID";
	}
};
/** This supergroup is not a forum. */
var ChannelForumMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "This supergroup is not a forum." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHANNEL_FORUM_MISSING";
	}
};
/** The specified supergroup ID is invalid. */
var ChannelIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified supergroup ID is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHANNEL_ID_INVALID";
	}
};
/** The provided channel is invalid. */
var ChannelInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided channel is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHANNEL_INVALID";
	}
};
/** [Monoforums](https://core.telegram.org/api/channel#monoforums) do not support this feature. */
var ChannelMonoforumUnsupportedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "[Monoforums](https://core.telegram.org/api/channel#monoforums) do not support this feature." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHANNEL_MONOFORUM_UNSUPPORTED";
	}
};
/** The current user is not in the channel. */
var ChannelParicipantMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The current user is not in the channel." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHANNEL_PARICIPANT_MISSING";
	}
};
/** You haven't joined this channel/supergroup. */
var ChannelPrivateError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You haven't joined this channel/supergroup." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHANNEL_PRIVATE";
	}
};
/** This channel has too many participants (>1000) to be deleted. */
var ChannelTooBigError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "This channel has too many participants (>1000) to be deleted." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHANNEL_TOO_BIG";
	}
};
/** Channel is too large to be deleted; this error is issued when trying to delete channels with more than 1000 members (subject to change). */
var ChannelTooLargeError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Channel is too large to be deleted; this error is issued when trying to delete channels with more than 1000 members (subject to change)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHANNEL_TOO_LARGE";
	}
};
/** The user has reached the limit of public geogroups. */
var ChannelsAdminLocatedTooMuchError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The user has reached the limit of public geogroups." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHANNELS_ADMIN_LOCATED_TOO_MUCH";
	}
};
/** You're admin of too many public channels, make some channels private to change the username of this channel. */
var ChannelsAdminPublicTooMuchError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You're admin of too many public channels, make some channels private to change the username of this channel." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHANNELS_ADMIN_PUBLIC_TOO_MUCH";
	}
};
/** You have joined too many channels/supergroups. */
var ChannelsTooMuchError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You have joined too many channels/supergroups." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHANNELS_TOO_MUCH";
	}
};
/** The transaction was already refunded. */
var ChargeAlreadyRefundedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The transaction was already refunded." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHARGE_ALREADY_REFUNDED";
	}
};
/** The specified charge_id is empty. */
var ChargeIdEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified charge_id is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHARGE_ID_EMPTY";
	}
};
/** The specified charge_id is invalid. */
var ChargeIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified charge_id is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHARGE_ID_INVALID";
	}
};
/** About text has not changed. */
var ChatAboutNotModifiedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "About text has not changed." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_ABOUT_NOT_MODIFIED";
	}
};
/** Chat about too long. */
var ChatAboutTooLongError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Chat about too long." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_ABOUT_TOO_LONG";
	}
};
/** You must be an admin in this chat to do this. */
var ChatAdminRequiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You must be an admin in this chat to do this." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_ADMIN_REQUIRED";
	}
};
/** You can't enable forum topics in a discussion group linked to a channel. */
var ChatDiscussionUnallowedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You can't enable forum topics in a discussion group linked to a channel." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_DISCUSSION_UNALLOWED";
	}
};
/** You can't forward messages from a protected chat. */
var ChatForwardsRestrictedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You can't forward messages from a protected chat." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_FORWARDS_RESTRICTED";
	}
};
/** The provided chat ID is empty. */
var ChatIdEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided chat ID is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_ID_EMPTY";
	}
};
/** The provided chat id is invalid. */
var ChatIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided chat id is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_ID_INVALID";
	}
};
/** Invalid chat. */
var ChatInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Invalid chat." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_INVALID";
	}
};
/** You can't set an expiration date on permanent invite links. */
var ChatInvitePermanentError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You can't set an expiration date on permanent invite links." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_INVITE_PERMANENT";
	}
};
/** The chat is public, you can't hide the history to new users. */
var ChatLinkExistsError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The chat is public, you can't hide the history to new users." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_LINK_EXISTS";
	}
};
/** Could not add participants. */
var ChatMemberAddFailedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Could not add participants." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_MEMBER_ADD_FAILED";
	}
};
/** No changes were made to chat information because the new information you passed is identical to the current information. */
var ChatNotModifiedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "No changes were made to chat information because the new information you passed is identical to the current information." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_NOT_MODIFIED";
	}
};
/** You can only enable join requests in public groups. */
var ChatPublicRequiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You can only enable join requests in public groups." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_PUBLIC_REQUIRED";
	}
};
/** You can't send messages in this chat, you were restricted. */
var ChatRestrictedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You can't send messages in this chat, you were restricted." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_RESTRICTED";
	}
};
/** `min_date` and `max_date` are not available for using with non-user peers. */
var ChatRevokeDateUnsupportedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "`min_date` and `max_date` are not available for using with non-user peers." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_REVOKE_DATE_UNSUPPORTED";
	}
};
/** You can't send inline messages in this group. */
var ChatSendInlineForbiddenError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You can't send inline messages in this group." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_SEND_INLINE_FORBIDDEN";
	}
};
/** No chat title provided. */
var ChatTitleEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "No chat title provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_TITLE_EMPTY";
	}
};
/** This method is not available for groups with more than `chat_read_mark_size_threshold` members, [see client configuration &raquo;](https://core.telegram.org/api/config#client-configuration). */
var ChatTooBigError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "This method is not available for groups with more than `chat_read_mark_size_threshold` members, [see client configuration &raquo;](https://core.telegram.org/api/config#client-configuration)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_TOO_BIG";
	}
};
/** You can't write in this chat. */
var ChatWriteForbiddenError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You can't write in this chat." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_WRITE_FORBIDDEN";
	}
};
/** The specified slug is empty. */
var ChatlinkSlugEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified slug is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHATLINK_SLUG_EMPTY";
	}
};
/** The specified [business chat link](https://core.telegram.org/api/business#business-chat-links) has expired. */
var ChatlinkSlugExpiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified [business chat link](https://core.telegram.org/api/business#business-chat-links) has expired." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHATLINK_SLUG_EXPIRED";
	}
};
/** Too many [business chat links](https://core.telegram.org/api/business#business-chat-links) were created, please delete some older links. */
var ChatlinksTooMuchError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Too many [business chat links](https://core.telegram.org/api/business#business-chat-links) were created, please delete some older links." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHATLINKS_TOO_MUCH";
	}
};
/** The specified `exclude_peers` are invalid. */
var ChatlistExcludeInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified `exclude_peers` are invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHATLIST_EXCLUDE_INVALID";
	}
};
/** You have created too many folder links, hitting the `chatlist_invites_limit_default`/`chatlist_invites_limit_premium` [limits &raquo;](https://core.telegram.org/api/config#chatlist-invites-limit-default). */
var ChatlistsTooMuchError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You have created too many folder links, hitting the `chatlist_invites_limit_default`/`chatlist_invites_limit_premium` [limits &raquo;](https://core.telegram.org/api/config#chatlist-invites-limit-default)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHATLISTS_TOO_MUCH";
	}
};
/** The provided code is empty. */
var CodeEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided code is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CODE_EMPTY";
	}
};
/** Code hash invalid. */
var CodeHashInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Code hash invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CODE_HASH_INVALID";
	}
};
/** Code invalid. */
var CodeInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Code invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CODE_INVALID";
	}
};
/** The specified collectible is invalid. */
var CollectibleInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified collectible is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "COLLECTIBLE_INVALID";
	}
};
/** The specified collectible could not be found. */
var CollectibleNotFoundError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified collectible could not be found." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "COLLECTIBLE_NOT_FOUND";
	}
};
/** The specified collection ID is invalid. */
var CollectionIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified collection ID is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "COLLECTION_ID_INVALID";
	}
};
/** The specified color palette ID was invalid. */
var ColorInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified color palette ID was invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "COLOR_INVALID";
	}
};
/** The provided API id is invalid. */
var ConnectionApiIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided API id is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CONNECTION_API_ID_INVALID";
	}
};
/** App version is empty. */
var ConnectionAppVersionEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "App version is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CONNECTION_APP_VERSION_EMPTY";
	}
};
/** The specified connection ID is invalid. */
var ConnectionIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified connection ID is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CONNECTION_ID_INVALID";
	}
};
/** Layer invalid. */
var ConnectionLayerInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Layer invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CONNECTION_LAYER_INVALID";
	}
};
/** Contact to add is missing. */
var ContactAddMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Contact to add is missing." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CONTACT_ADD_MISSING";
	}
};
/** The provided contact ID is invalid. */
var ContactIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided contact ID is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CONTACT_ID_INVALID";
	}
};
/** The specified user is not a contact. */
var ContactMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified user is not a contact." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CONTACT_MISSING";
	}
};
/** Contact name empty. */
var ContactNameEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Contact name empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CONTACT_NAME_EMPTY";
	}
};
/** Missing contact request. */
var ContactReqMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Missing contact request." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CONTACT_REQ_MISSING";
	}
};
/** An error occurred while creating the call. */
var CreateCallFailedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "An error occurred while creating the call." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CREATE_CALL_FAILED";
	}
};
/** The specified credential is invalid. */
var CredentialInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified credential is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CREDENTIAL_INVALID";
	}
};
/** The total amount of all prices is invalid. */
var CurrencyTotalAmountInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The total amount of all prices is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CURRENCY_TOTAL_AMOUNT_INVALID";
	}
};
/** Too many custom reactions were specified. */
var CustomReactionsTooManyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Too many custom reactions were specified." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CUSTOM_REACTIONS_TOO_MANY";
	}
};
/** The size of the specified secureValueErrorData.data_hash is invalid. */
var DataHashSizeInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The size of the specified secureValueErrorData.data_hash is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "DATA_HASH_SIZE_INVALID";
	}
};
/** Encrypted data invalid. */
var DataInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Encrypted data invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "DATA_INVALID";
	}
};
/** The provided JSON data is invalid. */
var DataJsonInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided JSON data is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "DATA_JSON_INVALID";
	}
};
/** Data too long. */
var DataTooLongError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Data too long." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "DATA_TOO_LONG";
	}
};
/** Date empty. */
var DateEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Date empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "DATE_EMPTY";
	}
};
/** The provided DC ID is invalid. */
var DcIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided DC ID is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "DC_ID_INVALID";
	}
};
/** g_a invalid. */
var DhGAInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "g_a invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "DH_G_A_INVALID";
	}
};
/** The specified document is invalid. */
var DocumentInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified document is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "DOCUMENT_INVALID";
	}
};
/** Message [effects](https://core.telegram.org/api/effects) can only be used in private 1-on-1 chats, but the caller tried to send a message with an effect to a group or channel. */
var EffectChatInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Message [effects](https://core.telegram.org/api/effects) can only be used in private 1-on-1 chats, but the caller tried to send a message with an effect to a group or channel." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "EFFECT_CHAT_INVALID";
	}
};
/** The specified effect ID is invalid. */
var EffectIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified effect ID is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "EFFECT_ID_INVALID";
	}
};
/** Email hash expired. */
var EmailHashExpiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Email hash expired." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "EMAIL_HASH_EXPIRED";
	}
};
/** Attempting to send a code to the recovery email, but no email is configured. */
var EmailInstallMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Attempting to send a code to the recovery email, but no email is configured." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "EMAIL_INSTALL_MISSING";
	}
};
/** The specified email is invalid. */
var EmailInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified email is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "EMAIL_INVALID";
	}
};
/** The specified email cannot be used to complete the operation. */
var EmailNotAllowedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified email cannot be used to complete the operation." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "EMAIL_NOT_ALLOWED";
	}
};
/** In order to change the login email with emailVerifyPurposeLoginChange, an existing login email must already be set using emailVerifyPurposeLoginSetup. */
var EmailNotSetupError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "In order to change the login email with emailVerifyPurposeLoginChange, an existing login email must already be set using emailVerifyPurposeLoginSetup." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "EMAIL_NOT_SETUP";
	}
};
/** The provided email isn't confirmed, %d is the length of the verification code that was just sent to the email: use [account.verifyEmail](https://core.telegram.org/method/account.verifyEmail) to enter the received verification code and enable the recovery email. */
var EmailUnconfirmedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const codeLength = Number(args.capture || 0);
		const message = "The provided email isn't confirmed, " + codeLength + " is the length of the verification code that was just sent to the email: use [account.verifyEmail](https://core.telegram.org/method/account.verifyEmail) to enter the received verification code and enable the recovery email." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.codeLength = codeLength;
	}
};
/** The verification email has expired. */
var EmailVerifyExpiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The verification email has expired." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "EMAIL_VERIFY_EXPIRED";
	}
};
/** The specified theme emoji is valid. */
var EmojiInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified theme emoji is valid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "EMOJI_INVALID";
	}
};
/** The specified `video_emoji_markup` was invalid. */
var EmojiMarkupInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified `video_emoji_markup` was invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "EMOJI_MARKUP_INVALID";
	}
};
/** The theme wasn't changed. */
var EmojiNotModifiedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The theme wasn't changed." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "EMOJI_NOT_MODIFIED";
	}
};
/** The emoji is empty. */
var EmoticonEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The emoji is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "EMOTICON_EMPTY";
	}
};
/** The specified emoji is invalid. */
var EmoticonInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified emoji is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "EMOTICON_INVALID";
	}
};
/** inputStickerSetDice.emoji cannot be empty. */
var EmoticonStickerpackMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "inputStickerSetDice.emoji cannot be empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "EMOTICON_STICKERPACK_MISSING";
	}
};
/** Encrypted message invalid. */
var EncryptedMessageInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Encrypted message invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ENCRYPTED_MESSAGE_INVALID";
	}
};
/** Secret chat already accepted. */
var EncryptionAlreadyAcceptedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Secret chat already accepted." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ENCRYPTION_ALREADY_ACCEPTED";
	}
};
/** The secret chat was already declined. */
var EncryptionAlreadyDeclinedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The secret chat was already declined." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ENCRYPTION_ALREADY_DECLINED";
	}
};
/** The secret chat was declined. */
var EncryptionDeclinedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The secret chat was declined." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ENCRYPTION_DECLINED";
	}
};
/** The provided secret chat ID is invalid. */
var EncryptionIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided secret chat ID is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ENCRYPTION_ID_INVALID";
	}
};
/** You provided too many styled message entities. */
var EntitiesTooLongError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You provided too many styled message entities." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ENTITIES_TOO_LONG";
	}
};
/** A specified [entity offset or length](https://core.telegram.org/api/entities#entity-length) is invalid, see [here &raquo;](https://core.telegram.org/api/entities#entity-length) for info on how to properly compute the entity offset/length. */
var EntityBoundsInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "A specified [entity offset or length](https://core.telegram.org/api/entities#entity-length) is invalid, see [here &raquo;](https://core.telegram.org/api/entities#entity-length) for info on how to properly compute the entity offset/length." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ENTITY_BOUNDS_INVALID";
	}
};
/** One of the passed messageEntityFormattedDate objects has an invalid format (i.e. an invalid combination of the format flags). */
var EntityDateFormatInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "One of the passed messageEntityFormattedDate objects has an invalid format (i.e. an invalid combination of the format flags)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ENTITY_DATE_FORMAT_INVALID";
	}
};
/** One of the passed messageEntityFormattedDate objects has an invalid date: the allowed value ranges from `0` to the current date plus 1098 days (`time()+1098*86400`). */
var EntityDateInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "One of the passed messageEntityFormattedDate objects has an invalid date: the allowed value ranges from `0` to the current date plus 1098 days (`time()+1098*86400`)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ENTITY_DATE_INVALID";
	}
};
/** The maximum text span that can be covered by a date entity is 31 UTF-16 code units if any of the date formatting flags is set, or 127 UTF-16 code units without.  . */
var EntityDateTooLongError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The maximum text span that can be covered by a date entity is 31 UTF-16 code units if any of the date formatting flags is set, or 127 UTF-16 code units without.  ." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ENTITY_DATE_TOO_LONG";
	}
};
/** You mentioned an invalid user. */
var EntityMentionUserInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You mentioned an invalid user." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ENTITY_MENTION_USER_INVALID";
	}
};
/** The provided error message is empty. */
var ErrorTextEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided error message is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ERROR_TEXT_EMPTY";
	}
};
/** The specified expiration date is invalid. */
var ExpireDateInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified expiration date is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "EXPIRE_DATE_INVALID";
	}
};
/** The specified `expires_at` timestamp is invalid. */
var ExpiresAtInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified `expires_at` timestamp is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "EXPIRES_AT_INVALID";
	}
};
/** Provided card is invalid. */
var ExportCardInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Provided card is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "EXPORT_CARD_INVALID";
	}
};
/** The specified `stars_amount` of the passed [inputMediaPaidMedia](https://core.telegram.org/constructor/inputMediaPaidMedia) is invalid. */
var ExtendedMediaAmountInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified `stars_amount` of the passed [inputMediaPaidMedia](https://core.telegram.org/constructor/inputMediaPaidMedia) is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "EXTENDED_MEDIA_AMOUNT_INVALID";
	}
};
/** The specified extended media is empty. */
var ExtendedMediaEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified extended media is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "EXTENDED_MEDIA_EMPTY";
	}
};
/** The specified paid media is invalid. */
var ExtendedMediaInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified paid media is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "EXTENDED_MEDIA_INVALID";
	}
};
/** Paid media is not allowed for the target peer. */
var ExtendedMediaPeerInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Paid media is not allowed for the target peer." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "EXTENDED_MEDIA_PEER_INVALID";
	}
};
/** External URL invalid. */
var ExternalUrlInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "External URL invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "EXTERNAL_URL_INVALID";
	}
};
/** File content-type is invalid. */
var FileContentTypeInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "File content-type is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FILE_CONTENT_TYPE_INVALID";
	}
};
/** An empty file was provided. */
var FileEmtpyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "An empty file was provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FILE_EMTPY";
	}
};
/** The provided file id is invalid. */
var FileIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided file id is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FILE_ID_INVALID";
	}
};
/** The provided file part is empty. */
var FilePartEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided file part is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FILE_PART_EMPTY";
	}
};
/** The file part number is invalid. */
var FilePartInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The file part number is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FILE_PART_INVALID";
	}
};
/** The length of a file part is invalid. */
var FilePartLengthInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The length of a file part is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FILE_PART_LENGTH_INVALID";
	}
};
/** Provided file part size has changed. */
var FilePartSizeChangedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Provided file part size has changed." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FILE_PART_SIZE_CHANGED";
	}
};
/** The provided file part size is invalid. */
var FilePartSizeInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided file part size is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FILE_PART_SIZE_INVALID";
	}
};
/** The uploaded file part is too big. */
var FilePartTooBigError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The uploaded file part is too big." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FILE_PART_TOO_BIG";
	}
};
/** The size of the uploaded file part is too small, please see the documentation for the allowed sizes. */
var FilePartTooSmallError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The size of the uploaded file part is too small, please see the documentation for the allowed sizes." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FILE_PART_TOO_SMALL";
	}
};
/** The number of file parts is invalid. */
var FilePartsInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The number of file parts is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FILE_PARTS_INVALID";
	}
};
/** The file reference of the media file at offset %d in the multi_media array is invalid. */
var FileReferenceEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const value = Number(args.capture || 0);
		const message = "The file reference of the media file at offset " + value + " in the multi_media array is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.value = value;
	}
};
/** The file reference of the media file at index %d in the passed media array expired, it [must be refreshed as specified in the documentation](https://core.telegram.org/api/file-references). . */
var FileReferenceExpiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const value = Number(args.capture || 0);
		const message = "The file reference of the media file at index " + value + " in the passed media array expired, it [must be refreshed as specified in the documentation](https://core.telegram.org/api/file-references). ." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.value = value;
	}
};
/** The [file reference](https://core.telegram.org/api/file-references) of the media file at index %d in the passed media array is invalid. */
var FileReferenceInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const value = Number(args.capture || 0);
		const message = "The [file reference](https://core.telegram.org/api/file-references) of the media file at index " + value + " in the passed media array is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.value = value;
	}
};
/** An empty file title was specified. */
var FileTitleEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "An empty file title was specified." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FILE_TITLE_EMPTY";
	}
};
/** The master DC did not accept the `file_token` (e.g., the token has expired). Continue downloading the file from the master DC using upload.getFile. */
var FileTokenInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The master DC did not accept the `file_token` (e.g., the token has expired). Continue downloading the file from the master DC using upload.getFile." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FILE_TOKEN_INVALID";
	}
};
/** The specified filter ID is invalid. */
var FilterIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified filter ID is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FILTER_ID_INVALID";
	}
};
/** The include_peers vector of the filter is empty. */
var FilterIncludeEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The include_peers vector of the filter is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FILTER_INCLUDE_EMPTY";
	}
};
/** The specified filter cannot be used in this context. */
var FilterNotSupportedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified filter cannot be used in this context." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FILTER_NOT_SUPPORTED";
	}
};
/** The title field of the filter is empty. */
var FilterTitleEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The title field of the filter is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FILTER_TITLE_EMPTY";
	}
};
/** The first name is invalid. */
var FirstnameInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The first name is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FIRSTNAME_INVALID";
	}
};
/** An empty folder ID was specified. */
var FolderIdEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "An empty folder ID was specified." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FOLDER_ID_EMPTY";
	}
};
/** Invalid folder ID. */
var FolderIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Invalid folder ID." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FOLDER_ID_INVALID";
	}
};
/** The form was generated more than 10 minutes ago and has expired, please re-generate it using [payments.getPaymentForm](https://core.telegram.org/method/payments.getPaymentForm) and pass the new `form_id`. */
var FormExpiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The form was generated more than 10 minutes ago and has expired, please re-generate it using [payments.getPaymentForm](https://core.telegram.org/method/payments.getPaymentForm) and pass the new `form_id`." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FORM_EXPIRED";
	}
};
/** The specified form ID is empty. */
var FormIdEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified form ID is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FORM_ID_EMPTY";
	}
};
/** The same payment form was already submitted.  . */
var FormSubmitDuplicateError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The same payment form was already submitted.  ." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FORM_SUBMIT_DUPLICATE";
	}
};
/** Please update your client. */
var FormUnsupportedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Please update your client." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FORM_UNSUPPORTED";
	}
};
/** You can't execute the specified action because the group is a [forum](https://core.telegram.org/api/forum), disable forum functionality to continue. */
var ForumEnabledError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You can't execute the specified action because the group is a [forum](https://core.telegram.org/api/forum), disable forum functionality to continue." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FORUM_ENABLED";
	}
};
/** You were just elected admin, you can't add or modify other admins yet. */
var FreshChangeAdminsForbiddenError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You were just elected admin, you can't add or modify other admins yet." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FRESH_CHANGE_ADMINS_FORBIDDEN";
	}
};
/** Bots can't use fromMessage min constructors. */
var FromMessageBotDisabledError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Bots can't use fromMessage min constructors." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FROM_MESSAGE_BOT_DISABLED";
	}
};
/** The specified from_id is invalid. */
var FromPeerInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified from_id is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FROM_PEER_INVALID";
	}
};
/** The current account is [frozen](https://core.telegram.org/api/auth#frozen-accounts), and cannot access the specified peer. */
var FrozenParticipantMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The current account is [frozen](https://core.telegram.org/api/auth#frozen-accounts), and cannot access the specified peer." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FROZEN_PARTICIPANT_MISSING";
	}
};
/** Bots can't send another bot's game. */
var GameBotInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Bots can't send another bot's game." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "GAME_BOT_INVALID";
	}
};
/** You can't modify the icon of the "General" topic. */
var GeneralModifyIconForbiddenError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You can't modify the icon of the \"General\" topic." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "GENERAL_MODIFY_ICON_FORBIDDEN";
	}
};
/** Invalid geoposition provided. */
var GeoPointInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Invalid geoposition provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "GEO_POINT_INVALID";
	}
};
/** GIF content-type invalid. */
var GifContentTypeInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "GIF content-type invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "GIF_CONTENT_TYPE_INVALID";
	}
};
/** The provided GIF ID is invalid. */
var GifIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided GIF ID is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "GIF_ID_INVALID";
	}
};
/** The value passed in invoice.inputInvoicePremiumGiftStars.months is invalid. */
var GiftMonthsInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The value passed in invoice.inputInvoicePremiumGiftStars.months is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "GIFT_MONTHS_INVALID";
	}
};
/** The specified gift slug has expired. */
var GiftSlugExpiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified gift slug has expired." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "GIFT_SLUG_EXPIRED";
	}
};
/** The specified slug is invalid. */
var GiftSlugInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified slug is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "GIFT_SLUG_INVALID";
	}
};
/** The specified amount of stars is invalid. */
var GiftStarsInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified amount of stars is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "GIFT_STARS_INVALID";
	}
};
/** This graph has expired, please obtain a new graph token. */
var GraphExpiredReloadError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "This graph has expired, please obtain a new graph token." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "GRAPH_EXPIRED_RELOAD";
	}
};
/** Invalid graph token provided, please reload the stats and provide the updated token. */
var GraphInvalidReloadError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Invalid graph token provided, please reload the stats and provide the updated token." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "GRAPH_INVALID_RELOAD";
	}
};
/** The graph is outdated, please get a new async token using stats.getBroadcastStats. */
var GraphOutdatedReloadError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The graph is outdated, please get a new async token using stats.getBroadcastStats." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "GRAPH_OUTDATED_RELOAD";
	}
};
/** The group call was already discarded. */
var GroupcallAlreadyDiscardedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The group call was already discarded." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "GROUPCALL_ALREADY_DISCARDED";
	}
};
/** The specified group call cannot be used in this context. */
var GroupcallForbiddenError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified group call cannot be used in this context." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "GROUPCALL_FORBIDDEN";
	}
};
/** The specified group call is invalid. */
var GroupcallInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified group call is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "GROUPCALL_INVALID";
	}
};
/** You haven't joined this group call. */
var GroupcallJoinMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You haven't joined this group call." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "GROUPCALL_JOIN_MISSING";
	}
};
/** Group call settings weren't modified. */
var GroupcallNotModifiedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Group call settings weren't modified." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "GROUPCALL_NOT_MODIFIED";
	}
};
/** The app needs to retry joining the group call with a new SSRC value. */
var GroupcallSsrcDuplicateMuchError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The app needs to retry joining the group call with a new SSRC value." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "GROUPCALL_SSRC_DUPLICATE_MUCH";
	}
};
/** Invalid grouped media. */
var GroupedMediaInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Invalid grouped media." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "GROUPED_MEDIA_INVALID";
	}
};
/** The provided hash is invalid. */
var HashInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided hash is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "HASH_INVALID";
	}
};
/** The size of the specified secureValueError.hash is invalid. */
var HashSizeInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The size of the specified secureValueError.hash is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "HASH_SIZE_INVALID";
	}
};
/** The specified hashtag is invalid. */
var HashtagInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified hashtag is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "HASHTAG_INVALID";
	}
};
/** The join request was missing or was already handled. */
var HideRequesterMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The join request was missing or was already handled." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "HIDE_REQUESTER_MISSING";
	}
};
/** The passed prepared inline message ID has expired. */
var IdExpiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The passed prepared inline message ID has expired." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ID_EXPIRED";
	}
};
/** The passed ID is invalid. */
var IdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The passed ID is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ID_INVALID";
	}
};
/** Failure while processing image. */
var ImageProcessFailedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Failure while processing image." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "IMAGE_PROCESS_FAILED";
	}
};
/** The specified chat export file is invalid. */
var ImportFileInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified chat export file is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "IMPORT_FILE_INVALID";
	}
};
/** The date specified in the import file is invalid. */
var ImportFormatDateInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The date specified in the import file is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "IMPORT_FORMAT_DATE_INVALID";
	}
};
/** The specified chat export file was exported from an unsupported chat app. */
var ImportFormatUnrecognizedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified chat export file was exported from an unsupported chat app." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "IMPORT_FORMAT_UNRECOGNIZED";
	}
};
/** The specified import ID is invalid. */
var ImportIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified import ID is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "IMPORT_ID_INVALID";
	}
};
/** The specified token is invalid. */
var ImportTokenInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified token is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "IMPORT_TOKEN_INVALID";
	}
};
/** The inline query expired. */
var InlineResultExpiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The inline query expired." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INLINE_RESULT_EXPIRED";
	}
};
/** The specified folder is invalid. */
var InputChatlistInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified folder is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INPUT_CHATLIST_INVALID";
	}
};
/** The specified [InputFile](https://core.telegram.org/type/InputFile) is invalid. */
var InputFileInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified [InputFile](https://core.telegram.org/type/InputFile) is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INPUT_FILE_INVALID";
	}
};
/** The specified filter is invalid. */
var InputFilterInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified filter is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INPUT_FILTER_INVALID";
	}
};
/** The specified peer array is empty. */
var InputPeersEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified peer array is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INPUT_PEERS_EMPTY";
	}
};
/** The specified payment purpose is invalid. */
var InputPurposeInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified payment purpose is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INPUT_PURPOSE_INVALID";
	}
};
/** The specified offer amount in stars is invalid, see [here &raquo;](https://core.telegram.org/api/gifts#collectible-gift-purchase-offers) for the allowed range. */
var InputStarsAmountInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified offer amount in stars is invalid, see [here &raquo;](https://core.telegram.org/api/gifts#collectible-gift-purchase-offers) for the allowed range." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INPUT_STARS_AMOUNT_INVALID";
	}
};
/**  The specified offer amount in nanotons is invalid, see [here &raquo;](https://core.telegram.org/api/gifts#collectible-gift-purchase-offers) for the allowed range. */
var InputStarsNanosInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = " The specified offer amount in nanotons is invalid, see [here &raquo;](https://core.telegram.org/api/gifts#collectible-gift-purchase-offers) for the allowed range." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INPUT_STARS_NANOS_INVALID";
	}
};
/** The specified text is empty. */
var InputTextEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified text is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INPUT_TEXT_EMPTY";
	}
};
/** The specified text is too long. */
var InputTextTooLongError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified text is too long." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INPUT_TEXT_TOO_LONG";
	}
};
/** The specified user was deleted. */
var InputUserDeactivatedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified user was deleted." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INPUT_USER_DEACTIVATED";
	}
};
/** If the user has anonymously joined a group call as a channel, they can't invite other users to the group call because that would cause deanonymization, because the invite would be sent using the original user ID, not the anonymized channel ID. */
var InviteForbiddenWithJoinasError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "If the user has anonymously joined a group call as a channel, they can't invite other users to the group call because that would cause deanonymization, because the invite would be sent using the original user ID, not the anonymized channel ID." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INVITE_FORBIDDEN_WITH_JOINAS";
	}
};
/** The invite hash is empty. */
var InviteHashEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The invite hash is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INVITE_HASH_EMPTY";
	}
};
/** The invite link has expired. */
var InviteHashExpiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The invite link has expired." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INVITE_HASH_EXPIRED";
	}
};
/** The invite hash is invalid. */
var InviteHashInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The invite hash is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INVITE_HASH_INVALID";
	}
};
/** You have successfully requested to join this chat or channel. */
var InviteRequestSentError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You have successfully requested to join this chat or channel." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INVITE_REQUEST_SENT";
	}
};
/** The specified invite link was already revoked or is invalid. */
var InviteRevokedMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified invite link was already revoked or is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INVITE_REVOKED_MISSING";
	}
};
/** The specified invite slug is empty. */
var InviteSlugEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified invite slug is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INVITE_SLUG_EMPTY";
	}
};
/** The specified chat folder link has expired. */
var InviteSlugExpiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified chat folder link has expired." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INVITE_SLUG_EXPIRED";
	}
};
/** The specified invitation slug is invalid. */
var InviteSlugInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified invitation slug is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INVITE_SLUG_INVALID";
	}
};
/** The maximum number of per-folder invites specified by the `chatlist_invites_limit_default`/`chatlist_invites_limit_premium` [client configuration parameters &raquo;](https://core.telegram.org/api/config#chatlist-invites-limit-default) was reached. */
var InvitesTooMuchError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The maximum number of per-folder invites specified by the `chatlist_invites_limit_default`/`chatlist_invites_limit_premium` [client configuration parameters &raquo;](https://core.telegram.org/api/config#chatlist-invites-limit-default) was reached." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INVITES_TOO_MUCH";
	}
};
/** The specified invoice is invalid. */
var InvoiceInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified invoice is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INVOICE_INVALID";
	}
};
/** The specified invoice payload is invalid. */
var InvoicePayloadInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified invoice payload is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INVOICE_PAYLOAD_INVALID";
	}
};
/** The specified peer cannot be used to join a group call. */
var JoinAsPeerInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified peer cannot be used to join a group call." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "JOIN_AS_PEER_INVALID";
	}
};
/** The specified language code is invalid. */
var LangCodeInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified language code is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "LANG_CODE_INVALID";
	}
};
/** The specified language code is not supported. */
var LangCodeNotSupportedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified language code is not supported." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "LANG_CODE_NOT_SUPPORTED";
	}
};
/** The provided language pack is invalid. */
var LangPackInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided language pack is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "LANG_PACK_INVALID";
	}
};
/** The specified lang_code is invalid. */
var LanguageInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified lang_code is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "LANGUAGE_INVALID";
	}
};
/** The last name is invalid. */
var LastnameInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The last name is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "LASTNAME_INVALID";
	}
};
/** The provided limit is invalid. */
var LimitInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided limit is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "LIMIT_INVALID";
	}
};
/** The specified reactions_limit value is invalid. */
var LimitPerPostInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified reactions_limit value is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "LIMIT_PER_POST_INVALID";
	}
};
/** Discussion link not modified. */
var LinkNotModifiedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Discussion link not modified." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "LINK_NOT_MODIFIED";
	}
};
/** The provided location is invalid. */
var LocationInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided location is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "LOCATION_INVALID";
	}
};
/** The specified manager bot is invalid. */
var ManagerInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified manager bot is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MANAGER_INVALID";
	}
};
/** The specified manager bot does not have the [user](https://core.telegram.org/constructor/user).`bot_can_manage_bots` flag set. */
var ManagerPermissionMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified manager bot does not have the [user](https://core.telegram.org/constructor/user).`bot_can_manage_bots` flag set." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MANAGER_PERMISSION_MISSING";
	}
};
/** The specified maximum date is invalid. */
var MaxDateInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified maximum date is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MAX_DATE_INVALID";
	}
};
/** The provided max ID is invalid. */
var MaxIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided max ID is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MAX_ID_INVALID";
	}
};
/** The specified max_qts is invalid. */
var MaxQtsInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified max_qts is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MAX_QTS_INVALID";
	}
};
/** The MD5 checksums do not match. */
var Md5ChecksumInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The MD5 checksums do not match." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MD5_CHECKSUM_INVALID";
	}
};
/** You already paid for the specified media. */
var MediaAlreadyPaidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You already paid for the specified media." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MEDIA_ALREADY_PAID";
	}
};
/** The caption is too long. */
var MediaCaptionTooLongError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The caption is too long." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MEDIA_CAPTION_TOO_LONG";
	}
};
/** The provided media object is invalid. */
var MediaEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided media object is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MEDIA_EMPTY";
	}
};
/** The specified media file is invalid. */
var MediaFileInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified media file is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MEDIA_FILE_INVALID";
	}
};
/** You tried to send media of different types in an album. */
var MediaGroupedInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You tried to send media of different types in an album." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MEDIA_GROUPED_INVALID";
	}
};
/** Media invalid. */
var MediaInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Media invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MEDIA_INVALID";
	}
};
/** The new media is invalid. */
var MediaNewInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The new media is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MEDIA_NEW_INVALID";
	}
};
/** Previous media invalid. */
var MediaPrevInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Previous media invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MEDIA_PREV_INVALID";
	}
};
/** The specified media TTL is invalid. */
var MediaTtlInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified media TTL is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MEDIA_TTL_INVALID";
	}
};
/** The specified media type cannot be used in stories. */
var MediaTypeInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified media type cannot be used in stories." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MEDIA_TYPE_INVALID";
	}
};
/** A non-story video cannot be repubblished as a story (emitted when trying to resend a non-story video as a story using inputDocument). */
var MediaVideoStoryMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "A non-story video cannot be repubblished as a story (emitted when trying to resend a non-story video as a story using inputDocument)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MEDIA_VIDEO_STORY_MISSING";
	}
};
/** This method can only be invoked on a geogroup. */
var MegagroupGeoRequiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "This method can only be invoked on a geogroup." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MEGAGROUP_GEO_REQUIRED";
	}
};
/** Invalid supergroup ID. */
var MegagroupIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Invalid supergroup ID." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MEGAGROUP_ID_INVALID";
	}
};
/** Group with hidden history for new members can't be set as discussion groups. */
var MegagroupPrehistoryHiddenError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Group with hidden history for new members can't be set as discussion groups." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MEGAGROUP_PREHISTORY_HIDDEN";
	}
};
/** You can only use this method on a supergroup. */
var MegagroupRequiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You can only use this method on a supergroup." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MEGAGROUP_REQUIRED";
	}
};
/** You can't edit this message anymore, too much time has passed since its creation. */
var MessageEditTimeExpiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You can't edit this message anymore, too much time has passed since its creation." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MESSAGE_EDIT_TIME_EXPIRED";
	}
};
/** The provided message is empty. */
var MessageEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided message is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MESSAGE_EMPTY";
	}
};
/** The provided message id is invalid. */
var MessageIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided message id is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MESSAGE_ID_INVALID";
	}
};
/** No message ids were provided. */
var MessageIdsEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "No message ids were provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MESSAGE_IDS_EMPTY";
	}
};
/** The provided message data is identical to the previous message data, the message wasn't modified. */
var MessageNotModifiedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided message data is identical to the previous message data, the message wasn't modified." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MESSAGE_NOT_MODIFIED";
	}
};
/** The specified message wasn't read yet. */
var MessageNotReadYetError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified message wasn't read yet." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MESSAGE_NOT_READ_YET";
	}
};
/** Poll closed. */
var MessagePollClosedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Poll closed." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MESSAGE_POLL_CLOSED";
	}
};
/** A non-empty list of IDs must be passed to `id`. */
var MessageRequiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "A non-empty list of IDs must be passed to `id`." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MESSAGE_REQUIRED";
	}
};
/** The provided message is too long. */
var MessageTooLongError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided message is too long." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MESSAGE_TOO_LONG";
	}
};
/** The message is too old, the requested information is not available. */
var MessageTooOldError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The message is too old, the requested information is not available." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MESSAGE_TOO_OLD";
	}
};
/** The specified method is invalid. */
var MethodInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified method is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "METHOD_INVALID";
	}
};
/** The specified minimum date is invalid. */
var MinDateInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified minimum date is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MIN_DATE_INVALID";
	}
};
/** The number of months specified in inputInvoicePremiumGiftStars.months is invalid. */
var MonthInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The number of months specified in inputInvoicePremiumGiftStars.months is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MONTH_INVALID";
	}
};
/** Invalid message ID provided. */
var MsgIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Invalid message ID provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MSG_ID_INVALID";
	}
};
/** [`chat_read_mark_expire_period` seconds](https://core.telegram.org/api/config#chat-read-mark-expire-period) have passed since the message was sent, read receipts were deleted. */
var MsgTooOldError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "[`chat_read_mark_expire_period` seconds](https://core.telegram.org/api/config#chat-read-mark-expire-period) have passed since the message was sent, read receipts were deleted." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MSG_TOO_OLD";
	}
};
/** The specified message is not a voice message. */
var MsgVoiceMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified message is not a voice message." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MSG_VOICE_MISSING";
	}
};
/** The specified voice message is too long to be transcribed. */
var MsgVoiceTooLongError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified voice message is too long to be transcribed." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MSG_VOICE_TOO_LONG";
	}
};
/** A waiting call returned an error. */
var MsgWaitError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "A waiting call returned an error." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MSG_WAIT_FAILED";
	}
};
/** Too many media files for album. */
var MultiMediaTooLongError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Too many media files for album." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MULTI_MEDIA_TOO_LONG";
	}
};
/** The specified bot name is invalid. */
var NameInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified bot name is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "NAME_INVALID";
	}
};
/** The caller didn't specify a valid action (either save or suggest) for the contact profile photo upload. */
var NeedActionMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The caller didn't specify a valid action (either save or suggest) for the contact profile photo upload." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "NEED_ACTION_MISSING";
	}
};
/** The new salt is invalid. */
var NewSaltInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The new salt is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "NEW_SALT_INVALID";
	}
};
/** No password is set on the current account, and no new password was specified in `new_settings`. */
var NewSettingsEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "No password is set on the current account, and no new password was specified in `new_settings`." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "NEW_SETTINGS_EMPTY";
	}
};
/** The new password settings are invalid. */
var NewSettingsInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The new password settings are invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "NEW_SETTINGS_INVALID";
	}
};
/** The specified offset is longer than 64 bytes. */
var NextOffsetInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified offset is longer than 64 bytes." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "NEXT_OFFSET_INVALID";
	}
};
/** The upgrade/transfer of the specified gift was already paid for or is free. */
var NoPaymentNeededError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The upgrade/transfer of the specified gift was already paid for or is free." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "NO_PAYMENT_NEEDED";
	}
};
/** Only the "General" topic with `id=1` can be hidden. */
var NogeneralHideForbiddenError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Only the \"General\" topic with `id=1` can be hidden." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "NOGENERAL_HIDE_FORBIDDEN";
	}
};
/** The current user is not eligible to join the Peer-to-Peer Login Program. */
var NotEligibleError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The current user is not eligible to join the Peer-to-Peer Login Program." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "NOT_ELIGIBLE";
	}
};
/** The current user hasn't joined the Peer-to-Peer Login Program. */
var NotJoinedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The current user hasn't joined the Peer-to-Peer Login Program." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "NOT_JOINED";
	}
};
/** The provided offset is invalid. */
var OffsetInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided offset is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "OFFSET_INVALID";
	}
};
/** The provided offset peer is invalid. */
var OffsetPeerIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided offset peer is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "OFFSET_PEER_ID_INVALID";
	}
};
/** Invalid option selected. */
var OptionInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Invalid option selected." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "OPTION_INVALID";
	}
};
/** Too many options provided. */
var OptionsTooMuchError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Too many options provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "OPTIONS_TOO_MUCH";
	}
};
/** The specified username order is invalid. */
var OrderInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified username order is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ORDER_INVALID";
	}
};
/** Short pack name invalid. */
var PackShortNameInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Short pack name invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PACK_SHORT_NAME_INVALID";
	}
};
/** A stickerpack with this name already exists. */
var PackShortNameOccupiedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "A stickerpack with this name already exists." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PACK_SHORT_NAME_OCCUPIED";
	}
};
/** The stickerpack title is invalid. */
var PackTitleInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The stickerpack title is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PACK_TITLE_INVALID";
	}
};
/** The masks and emojis flags are mutually exclusive. */
var PackTypeInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The masks and emojis flags are mutually exclusive." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PACK_TYPE_INVALID";
	}
};
/** The specified `parent_peer` is invalid. */
var ParentPeerInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified `parent_peer` is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PARENT_PEER_INVALID";
	}
};
/** The specified participant ID is invalid. */
var ParticipantIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified participant ID is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PARTICIPANT_ID_INVALID";
	}
};
/** Trying to enable a presentation, when the user hasn't joined the Video Chat with [phone.joinGroupCall](https://core.telegram.org/method/phone.joinGroupCall). */
var ParticipantJoinMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Trying to enable a presentation, when the user hasn't joined the Video Chat with [phone.joinGroupCall](https://core.telegram.org/method/phone.joinGroupCall)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PARTICIPANT_JOIN_MISSING";
	}
};
/** The other participant does not use an up to date telegram client with support for calls. */
var ParticipantVersionOutdatedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The other participant does not use an up to date telegram client with support for calls." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PARTICIPANT_VERSION_OUTDATED";
	}
};
/** Not enough participants. */
var ParticipantsTooFewError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Not enough participants." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PARTICIPANTS_TOO_FEW";
	}
};
/** Third-party clients currently don't support passkeys even when changing the origin. */
var PasskeyOriginMismatchError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Third-party clients currently don't support passkeys even when changing the origin." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PASSKEY_ORIGIN_MISMATCH";
	}
};
/** The provided password is empty. */
var PasswordEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided password is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PASSWORD_EMPTY";
	}
};
/** The provided password hash is invalid. */
var PasswordHashInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided password hash is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PASSWORD_HASH_INVALID";
	}
};
/** You must [enable 2FA](https://core.telegram.org/api/srp) before executing this operation. */
var PasswordMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You must [enable 2FA](https://core.telegram.org/api/srp) before executing this operation." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PASSWORD_MISSING";
	}
};
/** The recovery code has expired. */
var PasswordRecoveryExpiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The recovery code has expired." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PASSWORD_RECOVERY_EXPIRED";
	}
};
/** No email was set, can't recover password via email. */
var PasswordRecoveryNaError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "No email was set, can't recover password via email." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PASSWORD_RECOVERY_NA";
	}
};
/** A [2FA password](https://core.telegram.org/api/srp) must be configured to use Telegram Passport. */
var PasswordRequiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "A [2FA password](https://core.telegram.org/api/srp) must be configured to use Telegram Passport." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PASSWORD_REQUIRED";
	}
};
/** The password was modified less than 24 hours ago, try again in %d seconds. */
var PasswordTooFreshError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const value = Number(args.capture || 0);
		const message = "The password was modified less than 24 hours ago, try again in " + value + " seconds." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.value = value;
	}
};
/** The specified payment credentials are invalid. */
var PaymentCredentialsInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified payment credentials are invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PAYMENT_CREDENTIALS_INVALID";
	}
};
/** The specified payment provider is invalid. */
var PaymentProviderInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified payment provider is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PAYMENT_PROVIDER_INVALID";
	}
};
/** Payment is required for this action, see [here &raquo;](https://core.telegram.org/api/gifts) for more info. */
var PaymentRequiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Payment is required for this action, see [here &raquo;](https://core.telegram.org/api/gifts) for more info." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PAYMENT_REQUIRED";
	}
};
/** You can't pin an empty chat with a user. */
var PeerHistoryEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You can't pin an empty chat with a user." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PEER_HISTORY_EMPTY";
	}
};
/** The provided peer id is invalid. */
var PeerIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided peer id is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PEER_ID_INVALID";
	}
};
/** The provided peer ID is not supported. */
var PeerIdNotSupportedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided peer ID is not supported." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PEER_ID_NOT_SUPPORTED";
	}
};
/** The passed [keyboardButtonSwitchInline](https://core.telegram.org/constructor/keyboardButtonSwitchInline).`peer_types` field is invalid. */
var PeerTypesInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The passed [keyboardButtonSwitchInline](https://core.telegram.org/constructor/keyboardButtonSwitchInline).`peer_types` field is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PEER_TYPES_INVALID";
	}
};
/** The specified list of peers is empty. */
var PeersListEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified list of peers is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PEERS_LIST_EMPTY";
	}
};
/** Persistent timestamp empty. */
var PersistentTimestampEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Persistent timestamp empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PERSISTENT_TIMESTAMP_EMPTY";
	}
};
/** Persistent timestamp invalid. */
var PersistentTimestampInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Persistent timestamp invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PERSISTENT_TIMESTAMP_INVALID";
	}
};
/** phone_code is missing. */
var PhoneCodeEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "phone_code is missing." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PHONE_CODE_EMPTY";
	}
};
/** The phone code you provided has expired. */
var PhoneCodeExpiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The phone code you provided has expired." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PHONE_CODE_EXPIRED";
	}
};
/** phone_code_hash is missing. */
var PhoneCodeHashEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "phone_code_hash is missing." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PHONE_CODE_HASH_EMPTY";
	}
};
/** The provided phone code is invalid. */
var PhoneCodeInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided phone code is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PHONE_CODE_INVALID";
	}
};
/** An invalid or expired `phone_code_hash` was provided. */
var PhoneHashExpiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "An invalid or expired `phone_code_hash` was provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PHONE_HASH_EXPIRED";
	}
};
/** No user is associated to the specified phone number. */
var PhoneNotOccupiedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "No user is associated to the specified phone number." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PHONE_NOT_OCCUPIED";
	}
};
/** You can't sign up using this app. */
var PhoneNumberAppSignupForbiddenError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You can't sign up using this app." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PHONE_NUMBER_APP_SIGNUP_FORBIDDEN";
	}
};
/** The provided phone number is banned from telegram. */
var PhoneNumberBannedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided phone number is banned from telegram." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PHONE_NUMBER_BANNED";
	}
};
/** You asked for the code too many times. */
var PhoneNumberFloodError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You asked for the code too many times." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PHONE_NUMBER_FLOOD";
	}
};
/** The phone number is invalid. */
var PhoneNumberInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The phone number is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PHONE_NUMBER_INVALID";
	}
};
/** The phone number is already in use. */
var PhoneNumberOccupiedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The phone number is already in use." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PHONE_NUMBER_OCCUPIED";
	}
};
/** The phone number is not yet being used. */
var PhoneNumberUnoccupiedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The phone number is not yet being used." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PHONE_NUMBER_UNOCCUPIED";
	}
};
/** This phone is password protected. */
var PhonePasswordProtectedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "This phone is password protected." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PHONE_PASSWORD_PROTECTED";
	}
};
/** Photo mime-type invalid. */
var PhotoContentTypeInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Photo mime-type invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PHOTO_CONTENT_TYPE_INVALID";
	}
};
/** Photo URL invalid. */
var PhotoContentUrlEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Photo URL invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PHOTO_CONTENT_URL_EMPTY";
	}
};
/** Photo crop file missing. */
var PhotoCropFileMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Photo crop file missing." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PHOTO_CROP_FILE_MISSING";
	}
};
/** Photo is too small. */
var PhotoCropSizeSmallError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Photo is too small." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PHOTO_CROP_SIZE_SMALL";
	}
};
/** The extension of the photo is invalid. */
var PhotoExtInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The extension of the photo is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PHOTO_EXT_INVALID";
	}
};
/** Profile photo file missing. */
var PhotoFileMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Profile photo file missing." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PHOTO_FILE_MISSING";
	}
};
/** Photo ID invalid. */
var PhotoIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Photo ID invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PHOTO_ID_INVALID";
	}
};
/** Photo invalid. */
var PhotoInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Photo invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PHOTO_INVALID";
	}
};
/** The photo dimensions are invalid. */
var PhotoInvalidDimensionsError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The photo dimensions are invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PHOTO_INVALID_DIMENSIONS";
	}
};
/** Internal issues, try again later. */
var PhotoSaveFileInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Internal issues, try again later." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PHOTO_SAVE_FILE_INVALID";
	}
};
/** Photo thumbnail URL is empty. */
var PhotoThumbUrlEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Photo thumbnail URL is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PHOTO_THUMB_URL_EMPTY";
	}
};
/** You can't pin messages. */
var PinRestrictedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You can't pin messages." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PIN_RESTRICTED";
	}
};
/** Too many pinned dialogs. */
var PinnedDialogsTooMuchError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Too many pinned dialogs." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PINNED_DIALOGS_TOO_MUCH";
	}
};
/** There are too many pinned topics, unpin some first. */
var PinnedTooMuchError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "There are too many pinned topics, unpin some first." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PINNED_TOO_MUCH";
	}
};
/** The specified topic is already pinned. */
var PinnedTopicNotModifiedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified topic is already pinned." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PINNED_TOPIC_NOT_MODIFIED";
	}
};
/** One of the poll answers is not acceptable. */
var PollAnswerInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "One of the poll answers is not acceptable." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "POLL_ANSWER_INVALID";
	}
};
/** Invalid poll answers were provided. */
var PollAnswersInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Invalid poll answers were provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "POLL_ANSWERS_INVALID";
	}
};
/** Duplicate poll options provided. */
var PollOptionDuplicateError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Duplicate poll options provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "POLL_OPTION_DUPLICATE";
	}
};
/** Invalid poll option provided. */
var PollOptionInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Invalid poll option provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "POLL_OPTION_INVALID";
	}
};
/** One of the poll questions is not acceptable. */
var PollQuestionInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "One of the poll questions is not acceptable." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "POLL_QUESTION_INVALID";
	}
};
/** A premium account is required to execute this action. */
var PremiumAccountRequiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "A premium account is required to execute this action." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PREMIUM_ACCOUNT_REQUIRED";
	}
};
/** The specified InputStorePaymentPurpose is invalid. */
var PremiumPurposeInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified InputStorePaymentPurpose is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PREMIUM_PURPOSE_INVALID";
	}
};
/** The pricing for the [subscription](https://core.telegram.org/api/subscriptions) is invalid, the maximum price is specified in the [`stars_subscription_amount_max` config key &raquo;](https://core.telegram.org/api/config#stars-subscription-amount-max). */
var PricingChatInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The pricing for the [subscription](https://core.telegram.org/api/subscriptions) is invalid, the maximum price is specified in the [`stars_subscription_amount_max` config key &raquo;](https://core.telegram.org/api/config#stars-subscription-amount-max)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PRICING_CHAT_INVALID";
	}
};
/** The privacy key is invalid. */
var PrivacyKeyInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The privacy key is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PRIVACY_KEY_INVALID";
	}
};
/** Too many privacy rules were specified, the current limit is 1000. */
var PrivacyTooLongError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Too many privacy rules were specified, the current limit is 1000." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PRIVACY_TOO_LONG";
	}
};
/** The specified privacy rule combination is invalid. */
var PrivacyValueInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified privacy rule combination is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PRIVACY_VALUE_INVALID";
	}
};
/** `channel` only accepts a channel, but a supergroup was passed. */
var PublicBroadcastExpectedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "`channel` only accepts a channel, but a supergroup was passed." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PUBLIC_BROADCAST_EXPECTED";
	}
};
/** The specified e2e public key is invalid. */
var PublicKeyInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified e2e public key is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PUBLIC_KEY_INVALID";
	}
};
/** A public key is required. */
var PublicKeyRequiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "A public key is required." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PUBLIC_KEY_REQUIRED";
	}
};
/** The specified payment purpose is invalid. */
var PurposeInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified payment purpose is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PURPOSE_INVALID";
	}
};
/** The query ID is empty. */
var QueryIdEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The query ID is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "QUERY_ID_EMPTY";
	}
};
/** The query ID is invalid. */
var QueryIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The query ID is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "QUERY_ID_INVALID";
	}
};
/** The query string is too short. */
var QueryTooShortError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The query string is too short." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "QUERY_TOO_SHORT";
	}
};
/** [Quick replies](https://core.telegram.org/api/business#quick-reply-shortcuts) cannot be used by bots. */
var QuickRepliesBotNotAllowedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "[Quick replies](https://core.telegram.org/api/business#quick-reply-shortcuts) cannot be used by bots." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "QUICK_REPLIES_BOT_NOT_ALLOWED";
	}
};
/** A maximum of [appConfig.`quick_replies_limit`](https://core.telegram.org/api/config#quick-replies-limit) shortcuts may be created, the limit was reached. */
var QuickRepliesTooMuchError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "A maximum of [appConfig.`quick_replies_limit`](https://core.telegram.org/api/config#quick-replies-limit) shortcuts may be created, the limit was reached." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "QUICK_REPLIES_TOO_MUCH";
	}
};
/** You can forward a quiz while hiding the original author only after choosing an option in the quiz. */
var QuizAnswerMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You can forward a quiz while hiding the original author only after choosing an option in the quiz." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "QUIZ_ANSWER_MISSING";
	}
};
/** An invalid value was provided to the correct_answers field. */
var QuizCorrectAnswerInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "An invalid value was provided to the correct_answers field." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "QUIZ_CORRECT_ANSWER_INVALID";
	}
};
/** No correct quiz answer was specified. */
var QuizCorrectAnswersEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "No correct quiz answer was specified." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "QUIZ_CORRECT_ANSWERS_EMPTY";
	}
};
/** You specified too many correct answers in a quiz, quizzes can only have one right answer! */
var QuizCorrectAnswersTooMuchError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You specified too many correct answers in a quiz, quizzes can only have one right answer!" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "QUIZ_CORRECT_ANSWERS_TOO_MUCH";
	}
};
/** Quizzes can't have the multiple_choice flag set! */
var QuizMultipleInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Quizzes can't have the multiple_choice flag set!" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "QUIZ_MULTIPLE_INVALID";
	}
};
/** The specified `reply_to`.`quote_text` field is invalid. */
var QuoteTextInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified `reply_to`.`quote_text` field is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "QUOTE_TEXT_INVALID";
	}
};
/** You cannot raise your hand. */
var RaiseHandForbiddenError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You cannot raise your hand." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "RAISE_HAND_FORBIDDEN";
	}
};
/** You provided a random ID that was already used. */
var RandomIdDuplicateError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You provided a random ID that was already used." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "RANDOM_ID_DUPLICATE";
	}
};
/** Random ID empty. */
var RandomIdEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Random ID empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "RANDOM_ID_EMPTY";
	}
};
/** The specified `random_id` was expired (most likely it didn't follow the required `uint64_t random_id = (time() << 32) | ((uint64_t)random_uint32_t())` format, or the specified time is too far in the past). */
var RandomIdExpiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified `random_id` was expired (most likely it didn't follow the required `uint64_t random_id = (time() << 32) | ((uint64_t)random_uint32_t())` format, or the specified time is too far in the past)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "RANDOM_ID_EXPIRED";
	}
};
/** A provided random ID is invalid. */
var RandomIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "A provided random ID is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "RANDOM_ID_INVALID";
	}
};
/** Random length invalid. */
var RandomLengthInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Random length invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "RANDOM_LENGTH_INVALID";
	}
};
/** Invalid range provided. */
var RangesInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Invalid range provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "RANGES_INVALID";
	}
};
/** Empty reaction provided. */
var ReactionEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Empty reaction provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "REACTION_EMPTY";
	}
};
/** The specified reaction is invalid. */
var ReactionInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified reaction is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "REACTION_INVALID";
	}
};
/** The specified number of reactions is invalid. */
var ReactionsCountInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified number of reactions is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "REACTIONS_COUNT_INVALID";
	}
};
/** The message already has exactly `reactions_uniq_max` reaction emojis, you can't react with a new emoji, see [the docs for more info &raquo;](https://core.telegram.org/api/config#client-configuration). */
var ReactionsTooManyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The message already has exactly `reactions_uniq_max` reaction emojis, you can't react with a new emoji, see [the docs for more info &raquo;](https://core.telegram.org/api/config#client-configuration)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "REACTIONS_TOO_MANY";
	}
};
/** The specified receipt is empty. */
var ReceiptEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified receipt is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "RECEIPT_EMPTY";
	}
};
/** Reply markup for buy button empty. */
var ReplyMarkupBuyEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Reply markup for buy button empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "REPLY_MARKUP_BUY_EMPTY";
	}
};
/** A game message is being edited, but the newly provided keyboard doesn't have a keyboardButtonGame button. */
var ReplyMarkupGameEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "A game message is being edited, but the newly provided keyboard doesn't have a keyboardButtonGame button." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "REPLY_MARKUP_GAME_EMPTY";
	}
};
/** The provided reply markup is invalid. */
var ReplyMarkupInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided reply markup is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "REPLY_MARKUP_INVALID";
	}
};
/** The specified reply_markup is too long. */
var ReplyMarkupTooLongError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified reply_markup is too long." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "REPLY_MARKUP_TOO_LONG";
	}
};
/** The specified reply-to message ID is invalid. */
var ReplyMessageIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified reply-to message ID is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "REPLY_MESSAGE_ID_INVALID";
	}
};
/** Each shortcut can contain a maximum of [appConfig.`quick_reply_messages_limit`](https://core.telegram.org/api/config#quick-reply-messages-limit) messages, the limit was reached. */
var ReplyMessagesTooMuchError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Each shortcut can contain a maximum of [appConfig.`quick_reply_messages_limit`](https://core.telegram.org/api/config#quick-reply-messages-limit) messages, the limit was reached." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "REPLY_MESSAGES_TOO_MUCH";
	}
};
/** The specified `reply_to` field is invalid. */
var ReplyToInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified `reply_to` field is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "REPLY_TO_INVALID";
	}
};
/** The specified inputReplyToMonoForum.monoforum_peer_id is invalid. */
var ReplyToMonoforumPeerInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified inputReplyToMonoForum.monoforum_peer_id is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "REPLY_TO_MONOFORUM_PEER_INVALID";
	}
};
/** The replied-to user is invalid. */
var ReplyToUserInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The replied-to user is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "REPLY_TO_USER_INVALID";
	}
};
/** The request specified in request_msg_id has already expired. */
var RequestMsgExpiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The request specified in request_msg_id has already expired." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "REQUEST_MSG_EXPIRED";
	}
};
/** The master DC did not accept the `request_token` from the CDN DC. Continue downloading the file from the master DC using upload.getFile. */
var RequestTokenInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The master DC did not accept the `request_token` from the CDN DC. Continue downloading the file from the master DC using upload.getFile." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "REQUEST_TOKEN_INVALID";
	}
};
/** The offered price is too low. */
var ResellStarsTooFewError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The offered price is too low." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "RESELL_STARS_TOO_FEW";
	}
};
/** The offered price is too high. */
var ResellStarsTooMuchError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The offered price is too high." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "RESELL_STARS_TOO_MUCH";
	}
};
/** No password reset is in progress. */
var ResetRequestMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "No password reset is in progress." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "RESET_REQUEST_MISSING";
	}
};
/** You provided a duplicate result ID. */
var ResultIdDuplicateError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You provided a duplicate result ID." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "RESULT_ID_DUPLICATE";
	}
};
/** Result ID empty. */
var ResultIdEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Result ID empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "RESULT_ID_EMPTY";
	}
};
/** One of the specified result IDs is invalid. */
var ResultIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "One of the specified result IDs is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "RESULT_ID_INVALID";
	}
};
/** Result type invalid. */
var ResultTypeInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Result type invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "RESULT_TYPE_INVALID";
	}
};
/** Too many results were provided. */
var ResultsTooMuchError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Too many results were provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "RESULTS_TOO_MUCH";
	}
};
/** You cannot change your vote. */
var RevoteNotAllowedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You cannot change your vote." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "REVOTE_NOT_ALLOWED";
	}
};
/** The new admin rights are equal to the old rights, no change was made. */
var RightsNotModifiedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The new admin rights are equal to the old rights, no change was made." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "RIGHTS_NOT_MODIFIED";
	}
};
/** The specified ringtone is invalid. */
var RingtoneInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified ringtone is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "RINGTONE_INVALID";
	}
};
/** The MIME type for the ringtone is invalid. */
var RingtoneMimeInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The MIME type for the ringtone is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "RINGTONE_MIME_INVALID";
	}
};
/** Internal RSA decryption failed. */
var RsaDecryptFailedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Internal RSA decryption failed." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "RSA_DECRYPT_FAILED";
	}
};
/** The passed inputSavedStarGiftChat.saved_id is empty. */
var SavedIdEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The passed inputSavedStarGiftChat.saved_id is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SAVED_ID_EMPTY";
	}
};
/** Bots cannot schedule messages. */
var ScheduleBotNotAllowedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Bots cannot schedule messages." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SCHEDULE_BOT_NOT_ALLOWED";
	}
};
/** Invalid schedule date provided. */
var ScheduleDateInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Invalid schedule date provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SCHEDULE_DATE_INVALID";
	}
};
/** You can't schedule a message this far in the future. */
var ScheduleDateTooLateError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You can't schedule a message this far in the future." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SCHEDULE_DATE_TOO_LATE";
	}
};
/** Can't schedule until user is online, if the user's last seen timestamp is hidden by their privacy settings. */
var ScheduleStatusPrivateError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Can't schedule until user is online, if the user's last seen timestamp is hidden by their privacy settings." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SCHEDULE_STATUS_PRIVATE";
	}
};
/** There are too many scheduled messages. */
var ScheduleTooMuchError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "There are too many scheduled messages." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SCHEDULE_TOO_MUCH";
	}
};
/** The specified game score is invalid. */
var ScoreInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified game score is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SCORE_INVALID";
	}
};
/** The search query is empty. */
var SearchQueryEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The search query is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SEARCH_QUERY_EMPTY";
	}
};
/** You cannot provide a search query and an invite link at the same time. */
var SearchWithLinkNotSupportedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You cannot provide a search query and an invite link at the same time." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SEARCH_WITH_LINK_NOT_SUPPORTED";
	}
};
/** Invalid duration provided. */
var SecondsInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Invalid duration provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SECONDS_INVALID";
	}
};
/** A secure secret is required. */
var SecureSecretRequiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "A secure secret is required." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SECURE_SECRET_REQUIRED";
	}
};
/** Business bots can't delete messages just for the user, `revoke` **must** be set. */
var SelfDeleteRestrictedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Business bots can't delete messages just for the user, `revoke` **must** be set." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SELF_DELETE_RESTRICTED";
	}
};
/** You can't send messages as the specified peer. */
var SendAsPeerInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You can't send messages as the specified peer." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SEND_AS_PEER_INVALID";
	}
};
/** An inputBotInlineMessageGame can only be contained in an inputBotInlineResultGame, not in an inputBotInlineResult/inputBotInlineResultPhoto/etc. */
var SendMessageGameInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "An inputBotInlineMessageGame can only be contained in an inputBotInlineResultGame, not in an inputBotInlineResult/inputBotInlineResultPhoto/etc." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SEND_MESSAGE_GAME_INVALID";
	}
};
/** Invalid media provided. */
var SendMessageMediaInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Invalid media provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SEND_MESSAGE_MEDIA_INVALID";
	}
};
/** The message type is invalid. */
var SendMessageTypeInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The message type is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SEND_MESSAGE_TYPE_INVALID";
	}
};
/** This session was created less than 24 hours ago, try again in %d seconds. */
var SessionTooFreshError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const value = Number(args.capture || 0);
		const message = "This session was created less than 24 hours ago, try again in " + value + " seconds." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.value = value;
	}
};
/** Invalid settings were provided. */
var SettingsInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Invalid settings were provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SETTINGS_INVALID";
	}
};
/** The provided SHA256 hash is invalid. */
var Sha256HashInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided SHA256 hash is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SHA256_HASH_INVALID";
	}
};
/** The specified short name is invalid. */
var ShortNameInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified short name is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SHORT_NAME_INVALID";
	}
};
/** The specified short name is already in use. */
var ShortNameOccupiedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified short name is already in use." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SHORT_NAME_OCCUPIED";
	}
};
/** The specified shortcut is invalid. */
var ShortcutInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified shortcut is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SHORTCUT_INVALID";
	}
};
/** The specified slot list is empty. */
var SlotsEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified slot list is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SLOTS_EMPTY";
	}
};
/** Slowmode is enabled, you cannot forward multiple messages to this group. */
var SlowmodeMultiMsgsDisabledError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Slowmode is enabled, you cannot forward multiple messages to this group." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SLOWMODE_MULTI_MSGS_DISABLED";
	}
};
/** The specified invoice slug is invalid. */
var SlugInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified invoice slug is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SLUG_INVALID";
	}
};
/** An error occurred while creating the SMS code. */
var SmsCodeCreateFailedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "An error occurred while creating the SMS code." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SMS_CODE_CREATE_FAILED";
	}
};
/** The specified job ID is invalid. */
var SmsjobIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified job ID is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SMSJOB_ID_INVALID";
	}
};
/** The specified inputCheckPasswordSRP.A value is invalid. */
var SrpAInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified inputCheckPasswordSRP.A value is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SRP_A_INVALID";
	}
};
/** Invalid SRP ID provided. */
var SrpIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Invalid SRP ID provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SRP_ID_INVALID";
	}
};
/** Password has changed. */
var SrpPasswordChangedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Password has changed." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SRP_PASSWORD_CHANGED";
	}
};
/** The specified star gift was already converted to Stars. */
var StargiftAlreadyConvertedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified star gift was already converted to Stars." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARGIFT_ALREADY_CONVERTED";
	}
};
/** The specified star gift was already refunded. */
var StargiftAlreadyRefundedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified star gift was already refunded." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARGIFT_ALREADY_REFUNDED";
	}
};
/** The specified gift was already upgraded to a collectible gift. */
var StargiftAlreadyUpgradedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified gift was already upgraded to a collectible gift." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARGIFT_ALREADY_UPGRADED";
	}
};
/** One of the specified star gift attributes is invalid. */
var StargiftAttributeInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "One of the specified star gift attributes is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARGIFT_ATTRIBUTE_INVALID";
	}
};
/** The passed gift is invalid. */
var StargiftInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The passed gift is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARGIFT_INVALID";
	}
};
/** The specified inputInvoiceStarGift.message is invalid. */
var StargiftMessageInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified inputInvoiceStarGift.message is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARGIFT_MESSAGE_INVALID";
	}
};
/** The specified gift was not found. */
var StargiftNotFoundError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified gift was not found." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARGIFT_NOT_FOUND";
	}
};
/** You're not the owner of the gift you trying to transfer. */
var StargiftNotOwnerError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You're not the owner of the gift you trying to transfer." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARGIFT_NOT_OWNER";
	}
};
/** You can't transfer a non-collectible gift. */
var StargiftNotUniqueError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You can't transfer a non-collectible gift." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARGIFT_NOT_UNIQUE";
	}
};
/** The specified star gift object is invalid. */
var StargiftObjectInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified star gift object is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARGIFT_OBJECT_INVALID";
	}
};
/** The specified offer amount is invalid. */
var StargiftOfferInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified offer amount is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARGIFT_OFFER_INVALID";
	}
};
/** You can't send a purchase offer for this gift. */
var StargiftOfferNotAllowedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You can't send a purchase offer for this gift." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARGIFT_OFFER_NOT_ALLOWED";
	}
};
/** You cannot transfer or sell a gift owned by another user. */
var StargiftOwnerInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You cannot transfer or sell a gift owned by another user." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARGIFT_OWNER_INVALID";
	}
};
/** The specified inputSavedStarGiftChat.peer is invalid. */
var StargiftPeerInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified inputSavedStarGiftChat.peer is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARGIFT_PEER_INVALID";
	}
};
/** You can't buy the gift using the specified currency (i.e. trying to pay in Stars for TON gifts). */
var StargiftResellCurrencyNotAllowedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You can't buy the gift using the specified currency (i.e. trying to pay in Stars for TON gifts)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARGIFT_RESELL_CURRENCY_NOT_ALLOWED";
	}
};
/** You will be able to resell this gift in %d seconds. */
var StargiftResellTooEarlyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const value = Number(args.capture || 0);
		const message = "You will be able to resell this gift in " + value + " seconds." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.value = value;
	}
};
/** The specified gift slug is invalid. */
var StargiftSlugInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified gift slug is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARGIFT_SLUG_INVALID";
	}
};
/** You cannot transfer this gift yet, wait %d seconds. */
var StargiftTransferTooEarlyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const value = Number(args.capture || 0);
		const message = "You cannot transfer this gift yet, wait " + value + " seconds." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.value = value;
	}
};
/** A received gift can only be upgraded to a collectible gift if the [messageActionStarGift](https://core.telegram.org/constructor/messageActionStarGift)/[savedStarGift](https://core.telegram.org/constructor/savedStarGift).`can_upgrade` flag is set. */
var StargiftUpgradeUnavailableError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "A received gift can only be upgraded to a collectible gift if the [messageActionStarGift](https://core.telegram.org/constructor/messageActionStarGift)/[savedStarGift](https://core.telegram.org/constructor/savedStarGift).`can_upgrade` flag is set." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARGIFT_UPGRADE_UNAVAILABLE";
	}
};
/** The gift is sold out. */
var StargiftUsageLimitedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The gift is sold out." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARGIFT_USAGE_LIMITED";
	}
};
/** You've reached the starGift.limited_per_user limit, you can't buy any more gifts of this type. */
var StargiftUserUsageLimitedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You've reached the starGift.limited_per_user limit, you can't buy any more gifts of this type." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARGIFT_USER_USAGE_LIMITED";
	}
};
/** The previous referral program was terminated less than 24 hours ago: further changes can be made after the date specified in userFull.starref_program.end_date. */
var StarrefAwaitingEndError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The previous referral program was terminated less than 24 hours ago: further changes can be made after the date specified in userFull.starref_program.end_date." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARREF_AWAITING_END";
	}
};
/** The specified referral link is invalid. */
var StarrefExpiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified referral link is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARREF_EXPIRED";
	}
};
/** The specified affiliate link was already revoked. */
var StarrefHashRevokedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified affiliate link was already revoked." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARREF_HASH_REVOKED";
	}
};
/** The specified commission_permille is invalid: the minimum and maximum values for this parameter are contained in the [starref_min_commission_permille](https://core.telegram.org/api/config#starref-min-commission-permille) and [starref_max_commission_permille](https://core.telegram.org/api/config#starref-max-commission-permille) client configuration parameters. */
var StarrefPermilleInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified commission_permille is invalid: the minimum and maximum values for this parameter are contained in the [starref_min_commission_permille](https://core.telegram.org/api/config#starref-min-commission-permille) and [starref_max_commission_permille](https://core.telegram.org/api/config#starref-max-commission-permille) client configuration parameters." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARREF_PERMILLE_INVALID";
	}
};
/** The specified commission_permille is too low: the minimum and maximum values for this parameter are contained in the [starref_min_commission_permille](https://core.telegram.org/api/config#starref-min-commission-permille) and [starref_max_commission_permille](https://core.telegram.org/api/config#starref-max-commission-permille) client configuration parameters. */
var StarrefPermilleTooLowError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified commission_permille is too low: the minimum and maximum values for this parameter are contained in the [starref_min_commission_permille](https://core.telegram.org/api/config#starref-min-commission-permille) and [starref_max_commission_permille](https://core.telegram.org/api/config#starref-max-commission-permille) client configuration parameters." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARREF_PERMILLE_TOO_LOW";
	}
};
/** The specified amount in stars is invalid. */
var StarsAmountInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified amount in stars is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARS_AMOUNT_INVALID";
	}
};
/** The specified Telegram Star invoice is invalid. */
var StarsInvoiceInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified Telegram Star invoice is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARS_INVOICE_INVALID";
	}
};
/** To import this chat invite link, you must first [pay for the associated Telegram Star subscription &raquo;](https://core.telegram.org/api/subscriptions#channel-subscriptions). */
var StarsPaymentRequiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "To import this chat invite link, you must first [pay for the associated Telegram Star subscription &raquo;](https://core.telegram.org/api/subscriptions#channel-subscriptions)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARS_PAYMENT_REQUIRED";
	}
};
/** The start parameter is empty. */
var StartParamEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The start parameter is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "START_PARAM_EMPTY";
	}
};
/** Start parameter invalid. */
var StartParamInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Start parameter invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "START_PARAM_INVALID";
	}
};
/** Start parameter is too long. */
var StartParamTooLongError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Start parameter is too long." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "START_PARAM_TOO_LONG";
	}
};
/** The specified sticker document is invalid. */
var StickerDocumentInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified sticker document is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STICKER_DOCUMENT_INVALID";
	}
};
/** Sticker emoji invalid. */
var StickerEmojiInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Sticker emoji invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STICKER_EMOJI_INVALID";
	}
};
/** Sticker file invalid. */
var StickerFileInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Sticker file invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STICKER_FILE_INVALID";
	}
};
/** The specified video sticker has invalid dimensions. */
var StickerGifDimensionsError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified video sticker has invalid dimensions." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STICKER_GIF_DIMENSIONS";
	}
};
/** The provided sticker ID is invalid. */
var StickerIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided sticker ID is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STICKER_ID_INVALID";
	}
};
/** The provided sticker is invalid. */
var StickerInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided sticker is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STICKER_INVALID";
	}
};
/** The specified sticker MIME type is invalid. */
var StickerMimeInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified sticker MIME type is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STICKER_MIME_INVALID";
	}
};
/** Sticker png dimensions invalid. */
var StickerPngDimensionsError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Sticker png dimensions invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STICKER_PNG_DIMENSIONS";
	}
};
/** One of the specified stickers is not a valid PNG file. */
var StickerPngNopngError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "One of the specified stickers is not a valid PNG file." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STICKER_PNG_NOPNG";
	}
};
/** You must send the animated sticker as a document. */
var StickerTgsNodocError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You must send the animated sticker as a document." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STICKER_TGS_NODOC";
	}
};
/** Invalid TGS sticker provided. */
var StickerTgsNotgsError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Invalid TGS sticker provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STICKER_TGS_NOTGS";
	}
};
/** Incorrect stickerset thumb file provided, PNG / WEBP expected. */
var StickerThumbPngNopngError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Incorrect stickerset thumb file provided, PNG / WEBP expected." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STICKER_THUMB_PNG_NOPNG";
	}
};
/** Incorrect stickerset TGS thumb file provided. */
var StickerThumbTgsNotgsError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Incorrect stickerset TGS thumb file provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STICKER_THUMB_TGS_NOTGS";
	}
};
/** The specified video sticker is too big. */
var StickerVideoBigError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified video sticker is too big." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STICKER_VIDEO_BIG";
	}
};
/** You must send the video sticker as a document. */
var StickerVideoNodocError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You must send the video sticker as a document." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STICKER_VIDEO_NODOC";
	}
};
/** The specified video sticker is not in webm format. */
var StickerVideoNowebmError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified video sticker is not in webm format." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STICKER_VIDEO_NOWEBM";
	}
};
/** There are too many stickers in this stickerpack, you can't add any more. */
var StickerpackStickersTooMuchError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "There are too many stickers in this stickerpack, you can't add any more." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STICKERPACK_STICKERS_TOO_MUCH";
	}
};
/** No sticker provided. */
var StickersEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "No sticker provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STICKERS_EMPTY";
	}
};
/** There are too many stickers in this stickerpack, you can't add any more. */
var StickersTooMuchError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "There are too many stickers in this stickerpack, you can't add any more." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STICKERS_TOO_MUCH";
	}
};
/** The provided sticker set is invalid. */
var StickersetInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided sticker set is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STICKERSET_INVALID";
	}
};
/** This peer hasn't ever posted any stories. */
var StoriesNeverCreatedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "This peer hasn't ever posted any stories." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STORIES_NEVER_CREATED";
	}
};
/** You have hit the maximum active stories limit as specified by the [`story_expiring_limit_*` client configuration parameters](https://core.telegram.org/api/config#story-expiring-limit-default): you should buy a [Premium](https://core.telegram.org/api/premium) subscription, delete an active story, or wait for the oldest story to expire. */
var StoriesTooMuchError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You have hit the maximum active stories limit as specified by the [`story_expiring_limit_*` client configuration parameters](https://core.telegram.org/api/config#story-expiring-limit-default): you should buy a [Premium](https://core.telegram.org/api/premium) subscription, delete an active story, or wait for the oldest story to expire." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STORIES_TOO_MUCH";
	}
};
/** You specified no story IDs. */
var StoryIdEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You specified no story IDs." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STORY_ID_EMPTY";
	}
};
/** The specified story ID is invalid. */
var StoryIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified story ID is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STORY_ID_INVALID";
	}
};
/** This peer already has an active live story, and its ID is equal to %d. */
var StoryLiveAlreadyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const value = Number(args.capture || 0);
		const message = "This peer already has an active live story, and its ID is equal to " + value + "." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.value = value;
	}
};
/** The new story information you passed is equal to the previous story information, thus it wasn't modified. */
var StoryNotModifiedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The new story information you passed is equal to the previous story information, thus it wasn't modified." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STORY_NOT_MODIFIED";
	}
};
/** The specified story period is invalid for this account. */
var StoryPeriodInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified story period is invalid for this account." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STORY_PERIOD_INVALID";
	}
};
/** You've hit the monthly story limit as specified by the [`stories_sent_monthly_limit_*` client configuration parameters](https://core.telegram.org/api/config#stories-sent-monthly-limit-default): wait %d seconds before posting a new story. */
var StorySendFloodMonthlyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const value = Number(args.capture || 0);
		const message = "You've hit the monthly story limit as specified by the [`stories_sent_monthly_limit_*` client configuration parameters](https://core.telegram.org/api/config#stories-sent-monthly-limit-default): wait " + value + " seconds before posting a new story." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.value = value;
	}
};
/** You've hit the weekly story limit as specified by the [`stories_sent_weekly_limit_*` client configuration parameters](https://core.telegram.org/api/config#stories-sent-weekly-limit-default): wait for %d seconds before posting a new story. */
var StorySendFloodWeeklyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const value = Number(args.capture || 0);
		const message = "You've hit the weekly story limit as specified by the [`stories_sent_weekly_limit_*` client configuration parameters](https://core.telegram.org/api/config#stories-sent-weekly-limit-default): wait for " + value + " seconds before posting a new story." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.value = value;
	}
};
/** You cannot send a [bot subscription invoice](https://core.telegram.org/api/subscriptions#bot-subscriptions) directly, you may only create invoice links using [payments.exportInvoice](https://core.telegram.org/method/payments.exportInvoice). */
var SubscriptionExportMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You cannot send a [bot subscription invoice](https://core.telegram.org/api/subscriptions#bot-subscriptions) directly, you may only create invoice links using [payments.exportInvoice](https://core.telegram.org/method/payments.exportInvoice)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SUBSCRIPTION_EXPORT_MISSING";
	}
};
/** The specified subscription_id is invalid. */
var SubscriptionIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified subscription_id is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SUBSCRIPTION_ID_INVALID";
	}
};
/** The specified subscription_pricing.period is invalid. */
var SubscriptionPeriodInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified subscription_pricing.period is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SUBSCRIPTION_PERIOD_INVALID";
	}
};
/** The specified price for the suggested post is invalid. */
var SuggestedPostAmountInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified price for the suggested post is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SUGGESTED_POST_AMOUNT_INVALID";
	}
};
/** You cannot send suggested posts to non-[monoforum](https://core.telegram.org/api/monoforum) peers. */
var SuggestedPostPeerInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You cannot send suggested posts to non-[monoforum](https://core.telegram.org/api/monoforum) peers." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SUGGESTED_POST_PEER_INVALID";
	}
};
/** The switch_pm.text field was empty. */
var SwitchPmTextEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The switch_pm.text field was empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SWITCH_PM_TEXT_EMPTY";
	}
};
/** The URL specified in switch_webview.url is invalid! */
var SwitchWebviewUrlInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The URL specified in switch_webview.url is invalid!" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SWITCH_WEBVIEW_URL_INVALID";
	}
};
/** The specified takeout ID is invalid. */
var TakeoutInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified takeout ID is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TAKEOUT_INVALID";
	}
};
/** A [takeout](https://core.telegram.org/api/takeout) session needs to be initialized first, [see here &raquo; for more info](https://core.telegram.org/api/takeout). */
var TakeoutRequiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "A [takeout](https://core.telegram.org/api/takeout) session needs to be initialized first, [see here &raquo; for more info](https://core.telegram.org/api/takeout)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TAKEOUT_REQUIRED";
	}
};
/** An email reset was already requested. */
var TaskAlreadyExistsError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "An email reset was already requested." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TASK_ALREADY_EXISTS";
	}
};
/** The passed temporary key is already bound to another **perm_auth_key_id**. */
var TempAuthKeyAlreadyBoundError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The passed temporary key is already bound to another **perm_auth_key_id**." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TEMP_AUTH_KEY_ALREADY_BOUND";
	}
};
/** No temporary auth key provided. */
var TempAuthKeyEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "No temporary auth key provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TEMP_AUTH_KEY_EMPTY";
	}
};
/** The specified [invoice](https://core.telegram.org/constructor/invoice).`terms_url` is invalid. */
var TermsUrlInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified [invoice](https://core.telegram.org/constructor/invoice).`terms_url` is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TERMS_URL_INVALID";
	}
};
/** sendMessageTextDraftAction can only be used in private 1-on-1 chats. */
var TextdraftPeerInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "sendMessageTextDraftAction can only be used in private 1-on-1 chats." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TEXTDRAFT_PEER_INVALID";
	}
};
/** Invalid theme file provided. */
var ThemeFileInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Invalid theme file provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "THEME_FILE_INVALID";
	}
};
/** Invalid theme format provided. */
var ThemeFormatInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Invalid theme format provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "THEME_FORMAT_INVALID";
	}
};
/** Invalid theme provided. */
var ThemeInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Invalid theme provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "THEME_INVALID";
	}
};
/** The theme's MIME type is invalid. */
var ThemeMimeInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The theme's MIME type is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "THEME_MIME_INVALID";
	}
};
/** The specified `theme_params` field is invalid. */
var ThemeParamsInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified `theme_params` field is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "THEME_PARAMS_INVALID";
	}
};
/** The specified theme slug is invalid. */
var ThemeSlugInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified theme slug is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "THEME_SLUG_INVALID";
	}
};
/** The specified theme title is invalid. */
var ThemeTitleInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified theme title is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "THEME_TITLE_INVALID";
	}
};
/** The specified timezone does not exist. */
var TimezoneInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified timezone does not exist." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TIMEZONE_INVALID";
	}
};
/** The specified stickerpack title is invalid. */
var TitleInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified stickerpack title is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TITLE_INVALID";
	}
};
/** The temporary password is disabled. */
var TmpPasswordDisabledError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The temporary password is disabled." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TMP_PASSWORD_DISABLED";
	}
};
/** The passed tmp_password is invalid. */
var TmpPasswordInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The passed tmp_password is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TMP_PASSWORD_INVALID";
	}
};
/** The specified `to_id` of the passed inputInvoiceStarGiftResale or inputInvoiceStarGiftTransfer is invalid. */
var ToIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified `to_id` of the passed inputInvoiceStarGiftResale or inputInvoiceStarGiftTransfer is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TO_ID_INVALID";
	}
};
/** The specified destination language is invalid. */
var ToLangInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified destination language is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TO_LANG_INVALID";
	}
};
/** Duplicate [checklist items](https://core.telegram.org/api/todo) detected. */
var TodoItemDuplicateError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Duplicate [checklist items](https://core.telegram.org/api/todo) detected." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TODO_ITEM_DUPLICATE";
	}
};
/** A checklist was specified, but no [checklist items](https://core.telegram.org/api/todo) were passed. */
var TodoItemsEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "A checklist was specified, but no [checklist items](https://core.telegram.org/api/todo) were passed." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TODO_ITEMS_EMPTY";
	}
};
/** You specified too many todo list items. */
var TodoItemsTooMuchError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You specified too many todo list items." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TODO_ITEMS_TOO_MUCH";
	}
};
/** No todo items were specified, so no changes were made to the todo list. */
var TodoNotModifiedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "No todo items were specified, so no changes were made to the todo list." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TODO_NOT_MODIFIED";
	}
};
/** The specified token is empty. */
var TokenEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified token is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TOKEN_EMPTY";
	}
};
/** The provided token is invalid. */
var TokenInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided token is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TOKEN_INVALID";
	}
};
/** The specified token type is invalid. */
var TokenTypeInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified token type is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TOKEN_TYPE_INVALID";
	}
};
/** The `close` flag cannot be provided together with any of the other flags. */
var TopicCloseSeparatelyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The `close` flag cannot be provided together with any of the other flags." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TOPIC_CLOSE_SEPARATELY";
	}
};
/** This topic was closed, you can't send messages to it anymore. */
var TopicClosedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "This topic was closed, you can't send messages to it anymore." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TOPIC_CLOSED";
	}
};
/** The specified topic was deleted. */
var TopicDeletedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified topic was deleted." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TOPIC_DELETED";
	}
};
/** The `hide` flag cannot be provided together with any of the other flags. */
var TopicHideSeparatelyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The `hide` flag cannot be provided together with any of the other flags." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TOPIC_HIDE_SEPARATELY";
	}
};
/** The specified topic ID is invalid. */
var TopicIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified topic ID is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TOPIC_ID_INVALID";
	}
};
/** The updated topic info is equal to the current topic info, nothing was changed. */
var TopicNotModifiedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The updated topic info is equal to the current topic info, nothing was changed." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TOPIC_NOT_MODIFIED";
	}
};
/** The specified topic title is empty. */
var TopicTitleEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified topic title is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TOPIC_TITLE_EMPTY";
	}
};
/** You specified no topic IDs. */
var TopicsEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You specified no topic IDs." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TOPICS_EMPTY";
	}
};
/** The specified transaction ID is invalid. */
var TransactionIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified transaction ID is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TRANSACTION_ID_INVALID";
	}
};
/** Audio transcription failed. */
var TranscriptionFailedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Audio transcription failed." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TRANSCRIPTION_FAILED";
	}
};
/** Translation is currently unavailable due to a temporary server-side lack of resources. */
var TranslateReqQuotaExceededError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Translation is currently unavailable due to a temporary server-side lack of resources." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TRANSLATE_REQ_QUOTA_EXCEEDED";
	}
};
/** The provided TTL is invalid. */
var TtlDaysInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided TTL is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TTL_DAYS_INVALID";
	}
};
/** Invalid media Time To Live was provided. */
var TtlMediaInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Invalid media Time To Live was provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TTL_MEDIA_INVALID";
	}
};
/** The specified TTL period is invalid. */
var TtlPeriodInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified TTL period is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TTL_PERIOD_INVALID";
	}
};
/** No top peer type was provided. */
var TypesEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "No top peer type was provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TYPES_EMPTY";
	}
};
/** `require_payment` cannot be *set* by users, only by monoforums: users must instead use the [inputPrivacyKeyNoPaidMessages](https://core.telegram.org/constructor/inputPrivacyKeyNoPaidMessages) privacy setting to remove a previously added exemption. */
var UnsupportedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "`require_payment` cannot be *set* by users, only by monoforums: users must instead use the [inputPrivacyKeyNoPaidMessages](https://core.telegram.org/constructor/inputPrivacyKeyNoPaidMessages) privacy setting to remove a previously added exemption." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "UNSUPPORTED";
	}
};
/** Invalid until date provided. */
var UntilDateInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Invalid until date provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "UNTIL_DATE_INVALID";
	}
};
/** The specified OAuth request has expired. */
var UrlExpiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified OAuth request has expired." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "URL_EXPIRED";
	}
};
/** Invalid URL provided. */
var UrlInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Invalid URL provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "URL_INVALID";
	}
};
/** The specified usage limit is invalid. */
var UsageLimitInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified usage limit is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USAGE_LIMIT_INVALID";
	}
};
/** You're not an admin. */
var UserAdminInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You're not an admin." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USER_ADMIN_INVALID";
	}
};
/** You have already invited this user. */
var UserAlreadyInvitedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You have already invited this user." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USER_ALREADY_INVITED";
	}
};
/** The user is already in the group. */
var UserAlreadyParticipantError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The user is already in the group." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USER_ALREADY_PARTICIPANT";
	}
};
/** You're banned from sending messages in supergroups/channels. */
var UserBannedInChannelError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You're banned from sending messages in supergroups/channels." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USER_BANNED_IN_CHANNEL";
	}
};
/** User blocked. */
var UserBlockedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "User blocked." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USER_BLOCKED";
	}
};
/** Bots can only be admins in channels. */
var UserBotError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Bots can only be admins in channels." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USER_BOT";
	}
};
/** User accounts must provide the `bot` method parameter when calling this method. If there is no such method parameter, this method can only be invoked by bot accounts. */
var UserBotInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "User accounts must provide the `bot` method parameter when calling this method. If there is no such method parameter, this method can only be invoked by bot accounts." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USER_BOT_INVALID";
	}
};
/** This method can only be called by a bot. */
var UserBotRequiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "This method can only be called by a bot." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USER_BOT_REQUIRED";
	}
};
/** Bot-to-bot messaging is disabled because one of the two bots hasn't enabled the Bot to Bot setting in \@BotFather. */
var UserBotToBotDisabledError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Bot-to-bot messaging is disabled because one of the two bots hasn't enabled the Bot to Bot setting in @BotFather." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USER_BOT_TO_BOT_DISABLED";
	}
};
/** One of the users you tried to add is already in too many channels/supergroups. */
var UserChannelsTooMuchError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "One of the users you tried to add is already in too many channels/supergroups." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USER_CHANNELS_TOO_MUCH";
	}
};
/** For channels.editAdmin: you've tried to edit the admin rights of the owner, but you're not the owner; for channels.leaveChannel: you can't leave this channel, because you're its creator. */
var UserCreatorError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "For channels.editAdmin: you've tried to edit the admin rights of the owner, but you're not the owner; for channels.leaveChannel: you can't leave this channel, because you're its creator." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USER_CREATOR";
	}
};
/** Gifts are not available in the current region ([stars_gifts_enabled](https://core.telegram.org/api/config#stars-gifts-enabled) is equal to false). */
var UserGiftUnavailableError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Gifts are not available in the current region ([stars_gifts_enabled](https://core.telegram.org/api/config#stars-gifts-enabled) is equal to false)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USER_GIFT_UNAVAILABLE";
	}
};
/** The provided user ID is invalid. */
var UserIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided user ID is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USER_ID_INVALID";
	}
};
/** Invalid user provided. */
var UserInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Invalid user provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USER_INVALID";
	}
};
/** You were blocked by this user. */
var UserIsBlockedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You were blocked by this user." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USER_IS_BLOCKED";
	}
};
/** Bots can't send messages to other bots. */
var UserIsBotError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Bots can't send messages to other bots." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USER_IS_BOT";
	}
};
/** This user was kicked from this supergroup/channel. */
var UserKickedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "This user was kicked from this supergroup/channel." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USER_KICKED";
	}
};
/** The provided user is not a mutual contact. */
var UserNotMutualContactError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided user is not a mutual contact." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USER_NOT_MUTUAL_CONTACT";
	}
};
/** You're not a member of this supergroup/channel. */
var UserNotParticipantError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You're not a member of this supergroup/channel." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USER_NOT_PARTICIPANT";
	}
};
/** Cannot generate a link to stories posted by a peer without a username. */
var UserPublicMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Cannot generate a link to stories posted by a peer without a username." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USER_PUBLIC_MISSING";
	}
};
/** The specified user volume is invalid. */
var UserVolumeInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified user volume is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USER_VOLUME_INVALID";
	}
};
/** The provided username is not valid. */
var UsernameInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided username is not valid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USERNAME_INVALID";
	}
};
/** The username was not modified. */
var UsernameNotModifiedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The username was not modified." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USERNAME_NOT_MODIFIED";
	}
};
/** The provided username is not occupied. */
var UsernameNotOccupiedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided username is not occupied." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USERNAME_NOT_OCCUPIED";
	}
};
/** The provided username is already occupied. */
var UsernameOccupiedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided username is already occupied." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USERNAME_OCCUPIED";
	}
};
/** The specified username can be purchased on https://fragment.com. */
var UsernamePurchaseAvailableError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified username can be purchased on https://fragment.com." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USERNAME_PURCHASE_AVAILABLE";
	}
};
/** The required `bot` suffix is missing from the passed username. */
var UsernameSuffixMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The required `bot` suffix is missing from the passed username." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USERNAME_SUFFIX_MISSING";
	}
};
/** The maximum number of active usernames was reached. */
var UsernamesActiveTooMuchError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The maximum number of active usernames was reached." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USERNAMES_ACTIVE_TOO_MUCH";
	}
};
/** You must have a profile picture to publish your geolocation. */
var UserpicUploadRequiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You must have a profile picture to publish your geolocation." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USERPIC_UPLOAD_REQUIRED";
	}
};
/** Not enough users (to create a chat, for example). */
var UsersTooFewError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Not enough users (to create a chat, for example)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USERS_TOO_FEW";
	}
};
/** The maximum number of users has been exceeded (to create a chat, for example). */
var UsersTooMuchError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The maximum number of users has been exceeded (to create a chat, for example)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USERS_TOO_MUCH";
	}
};
/** The specified venue ID is invalid. */
var VenueIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified venue ID is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "VENUE_ID_INVALID";
	}
};
/** The video's content type is invalid. */
var VideoContentTypeInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The video's content type is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "VIDEO_CONTENT_TYPE_INVALID";
	}
};
/** The duration of the specified video is invalid. */
var VideoDurationInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The duration of the specified video is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "VIDEO_DURATION_INVALID";
	}
};
/** The specified video file is invalid. */
var VideoFileInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified video file is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "VIDEO_FILE_INVALID";
	}
};
/** You cannot pause the video stream. */
var VideoPauseForbiddenError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You cannot pause the video stream." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "VIDEO_PAUSE_FORBIDDEN";
	}
};
/** You cannot stop the video stream. */
var VideoStopForbiddenError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You cannot stop the video stream." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "VIDEO_STOP_FORBIDDEN";
	}
};
/** The specified video title is empty. */
var VideoTitleEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified video title is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "VIDEO_TITLE_EMPTY";
	}
};
/** This user's privacy settings forbid you from sending voice messages. */
var VoiceMessagesForbiddenError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "This user's privacy settings forbid you from sending voice messages." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "VOICE_MESSAGES_FORBIDDEN";
	}
};
/** The specified wallpaper file is invalid. */
var WallpaperFileInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified wallpaper file is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "WALLPAPER_FILE_INVALID";
	}
};
/** The specified wallpaper is invalid. */
var WallpaperInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified wallpaper is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "WALLPAPER_INVALID";
	}
};
/** The specified wallpaper MIME type is invalid. */
var WallpaperMimeInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified wallpaper MIME type is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "WALLPAPER_MIME_INVALID";
	}
};
/** The specified wallpaper could not be found. */
var WallpaperNotFoundError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified wallpaper could not be found." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "WALLPAPER_NOT_FOUND";
	}
};
/** WC convert URL invalid. */
var WcConvertUrlInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "WC convert URL invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "WC_CONVERT_URL_INVALID";
	}
};
/** The specified webapp_req_id is invalid. */
var WebappReqIdInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified webapp_req_id is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "WEBAPP_REQ_ID_INVALID";
	}
};
/** The specified auth token has expired. */
var WebauthTokenExpiredError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified auth token has expired." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "WEBAUTH_TOKEN_EXPIRED";
	}
};
/** Invalid webdocument URL provided. */
var WebdocumentInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Invalid webdocument URL provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "WEBDOCUMENT_INVALID";
	}
};
/** Invalid webdocument mime type provided. */
var WebdocumentMimeInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Invalid webdocument mime type provided." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "WEBDOCUMENT_MIME_INVALID";
	}
};
/** Webdocument is too big! */
var WebdocumentSizeTooBigError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Webdocument is too big!" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "WEBDOCUMENT_SIZE_TOO_BIG";
	}
};
/** The passed web document URL is empty. */
var WebdocumentUrlEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The passed web document URL is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "WEBDOCUMENT_URL_EMPTY";
	}
};
/** The specified webdocument URL is invalid. */
var WebdocumentUrlInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified webdocument URL is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "WEBDOCUMENT_URL_INVALID";
	}
};
/** Failure while fetching the webpage with cURL. */
var WebpageCurlFailedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Failure while fetching the webpage with cURL." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "WEBPAGE_CURL_FAILED";
	}
};
/** Webpage media empty. */
var WebpageMediaEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Webpage media empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "WEBPAGE_MEDIA_EMPTY";
	}
};
/** A preview for the specified webpage `url` could not be generated. */
var WebpageNotFoundError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "A preview for the specified webpage `url` could not be generated." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "WEBPAGE_NOT_FOUND";
	}
};
/** The specified webpage `url` is invalid. */
var WebpageUrlInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified webpage `url` is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "WEBPAGE_URL_INVALID";
	}
};
/** The specified web push authentication secret is invalid. */
var WebpushAuthInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified web push authentication secret is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "WEBPUSH_AUTH_INVALID";
	}
};
/** The specified web push elliptic curve Diffie-Hellman public key is invalid. */
var WebpushKeyInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified web push elliptic curve Diffie-Hellman public key is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "WEBPUSH_KEY_INVALID";
	}
};
/** The specified web push token is invalid. */
var WebpushTokenInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified web push token is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "WEBPUSH_TOKEN_INVALID";
	}
};
/** You blocked this user. */
var YouBlockedUserError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You blocked this user." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "YOU_BLOCKED_USER";
	}
};
/** The specified method cannot be used by bots. */
var BotMethodInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified method cannot be used by bots." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_METHOD_INVALID";
	}
};
/** The specified device model is empty. */
var ConnectionDeviceModelEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified device model is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CONNECTION_DEVICE_MODEL_EMPTY";
	}
};
/** The specified language pack is empty. */
var ConnectionLangPackInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified language pack is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CONNECTION_LANG_PACK_INVALID";
	}
};
/** Please initialize the connection using initConnection before making queries. */
var ConnectionNotInitedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Please initialize the connection using initConnection before making queries." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CONNECTION_NOT_INITED";
	}
};
/** The specified system version is empty. */
var ConnectionSystemEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified system version is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CONNECTION_SYSTEM_EMPTY";
	}
};
/** The specified system language code is empty. */
var ConnectionSystemLangCodeEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified system language code is empty." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CONNECTION_SYSTEM_LANG_CODE_EMPTY";
	}
};
/** The file currently being accessed is stored in DC %d, please re-send the query to that DC. */
var FileMigrateError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const newDc = Number(args.capture || 0);
		const message = "The file currently being accessed is stored in DC " + newDc + ", please re-send the query to that DC." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.newDc = newDc;
	}
};
/** Part %d of the file is missing from storage. Try repeating the method call to resave the part. */
var FilePartMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const value = Number(args.capture || 0);
		const message = "Part " + value + " of the file is missing from storage. Try repeating the method call to resave the part." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.value = value;
	}
};
/** The specified TL constructor is invalid. */
var InputConstructorInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified TL constructor is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INPUT_CONSTRUCTOR_INVALID";
	}
};
/** An error occurred while parsing the provided TL constructor. */
var InputFetchErrorError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "An error occurred while parsing the provided TL constructor." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INPUT_FETCH_ERROR";
	}
};
/** An error occurred while parsing the provided TL constructor. */
var InputFetchFailError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "An error occurred while parsing the provided TL constructor." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INPUT_FETCH_FAIL";
	}
};
/** The specified layer is invalid. */
var InputLayerInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified layer is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INPUT_LAYER_INVALID";
	}
};
/** The specified method is invalid. */
var InputMethodInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The specified method is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INPUT_METHOD_INVALID";
	}
};
/** The request payload is too long. */
var InputRequestTooLongError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The request payload is too long." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INPUT_REQUEST_TOO_LONG";
	}
};
/** The current account is spamreported, you cannot execute this action, check \@spambot for more info. */
var PeerFloodError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The current account is spamreported, you cannot execute this action, check @spambot for more info." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PEER_FLOOD";
	}
};
/** The passed stickerset information is equal to the current information. */
var StickersetNotModifiedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The passed stickerset information is equal to the current information." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STICKERSET_NOT_MODIFIED";
	}
};
/** An invalid authorization token was provided */
var AuthTokenInvalid2Error = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "An invalid authorization token was provided" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "AUTH_TOKEN_INVALID2";
	}
};
/** Base port location invalid */
var BasePortLocInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Base port location invalid" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BASE_PORT_LOC_INVALID";
	}
};
/** The provided commands are too many */
var BotCommandsTooMuchError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The provided commands are too many" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_COMMANDS_TOO_MUCH";
	}
};
/** This method can only be run by a bot */
var BotMissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "This method can only be run by a bot" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_MISSING";
	}
};
/** You cannot create polls under a bot account */
var BotPollsDisabledError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "You cannot create polls under a bot account" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_POLLS_DISABLED";
	}
};
/** BROADCAST_CALLS_DISABLED */
var BroadcastCallsDisabledError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "BROADCAST_CALLS_DISABLED" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BROADCAST_CALLS_DISABLED";
	}
};
/** The channel is banned */
var ChannelBannedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The channel is banned" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHANNEL_BANNED";
	}
};
/** EXPIRE_FORBIDDEN */
var ExpireForbiddenError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "EXPIRE_FORBIDDEN" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "EXPIRE_FORBIDDEN";
	}
};
/** The field with the name FIELD_NAME is missing */
var FieldNameEmptyError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The field with the name FIELD_NAME is missing" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FIELD_NAME_EMPTY";
	}
};
/** The field with the name FIELD_NAME is invalid */
var FieldNameInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The field with the name FIELD_NAME is invalid" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FIELD_NAME_INVALID";
	}
};
/** File part 0 missing */
var FilePart0MissingError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "File part 0 missing" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FILE_PART_0_MISSING";
	}
};
/** Group call invalid */
var GroupCallInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Group call invalid" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "GROUP_CALL_INVALID";
	}
};
/** This layer does not support polls in the issued method */
var PollUnsupportedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "This layer does not support polls in the issued method" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "POLL_UNSUPPORTED";
	}
};
/** Invalid call reflector server */
var ReflectorNotAvailableError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "Invalid call reflector server" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "REFLECTOR_NOT_AVAILABLE";
	}
};
/** An error occurred when trying to register the short-name used for the sticker pack. Try a different name */
var ShortnameOccupyFailedError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "An error occurred when trying to register the short-name used for the sticker pack. Try a different name" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SHORTNAME_OCCUPY_FAILED";
	}
};
/** The type constructor is invalid */
var TypeConstructorInvalidError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "The type constructor is invalid" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TYPE_CONSTRUCTOR_INVALID";
	}
};
/** UNKNOWN_ERROR */
var UnknownErrorError = class extends require_errors_RPCBaseErrors.BadRequestError {
	constructor(args) {
		const message = "UNKNOWN_ERROR" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "UNKNOWN_ERROR";
	}
};
/** The specified authorization key is not registered in the system (for example, a PFS temporary key has expired). */
var AuthKeyUnregisteredError = class extends require_errors_RPCBaseErrors.UnauthorizedError {
	constructor(args) {
		const message = "The specified authorization key is not registered in the system (for example, a PFS temporary key has expired)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "AUTH_KEY_UNREGISTERED";
	}
};
/** The specified auth key is invalid. */
var AuthKeyInvalidError = class extends require_errors_RPCBaseErrors.UnauthorizedError {
	constructor(args) {
		const message = "The specified auth key is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "AUTH_KEY_INVALID";
	}
};
/** The method is unavailable for temporary authorization keys, not bound to a permanent authorization key. */
var AuthKeyPermEmptyError = class extends require_errors_RPCBaseErrors.UnauthorizedError {
	constructor(args) {
		const message = "The method is unavailable for temporary authorization keys, not bound to a permanent authorization key." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "AUTH_KEY_PERM_EMPTY";
	}
};
/** The session has expired. */
var SessionExpiredError = class extends require_errors_RPCBaseErrors.UnauthorizedError {
	constructor(args) {
		const message = "The session has expired." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SESSION_EXPIRED";
	}
};
/** 2FA is enabled, use a password to login. */
var SessionPasswordNeededError = class extends require_errors_RPCBaseErrors.UnauthorizedError {
	constructor(args) {
		const message = "2FA is enabled, use a password to login." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SESSION_PASSWORD_NEEDED";
	}
};
/** The session was revoked by the user. */
var SessionRevokedError = class extends require_errors_RPCBaseErrors.UnauthorizedError {
	constructor(args) {
		const message = "The session was revoked by the user." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SESSION_REVOKED";
	}
};
/** The current account was deleted by the user. */
var UserDeactivatedError = class extends require_errors_RPCBaseErrors.UnauthorizedError {
	constructor(args) {
		const message = "The current account was deleted by the user." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USER_DEACTIVATED";
	}
};
/** The current account was deleted and banned by Telegram's antispam system. */
var UserDeactivatedBanError = class extends require_errors_RPCBaseErrors.UnauthorizedError {
	constructor(args) {
		const message = "The current account was deleted and banned by Telegram's antispam system." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USER_DEACTIVATED_BAN";
	}
};
/** The method is only available to already activated users */
var ActiveUserRequiredError = class extends require_errors_RPCBaseErrors.UnauthorizedError {
	constructor(args) {
		const message = "The method is only available to already activated users" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ACTIVE_USER_REQUIRED";
	}
};
/** The account was deactivated, or is a bot/service account. */
var AccessDeniedError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "The account was deactivated, or is a bot/service account." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ACCESS_DENIED";
	}
};
/** This peer charges %d [Telegram Stars](https://core.telegram.org/api/stars) per message, but the `allow_paid_stars` was not set or its value is smaller than %d. */
var AllowPaymentRequiredError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const value = Number(args.capture || 0);
		const message = "This peer charges " + value + " [Telegram Stars](https://core.telegram.org/api/stars) per message, but the `allow_paid_stars` was not set or its value is smaller than " + value + "." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.value = value;
	}
};
/** The specified method *can* be used over a [business connection](https://core.telegram.org/api/bots/connected-business-bots) for some operations, but the specified query attempted an operation that is not allowed over a business connection. */
var BotAccessForbiddenError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "The specified method *can* be used over a [business connection](https://core.telegram.org/api/bots/connected-business-bots) for some operations, but the specified query attempted an operation that is not allowed over a business connection." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_ACCESS_FORBIDDEN";
	}
};
/** Since the bot's user.bot_forum_can_manage_topics flag is **not** set, the user cannot create or modify bot forum topics. */
var BotForumCreateForbiddenError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "Since the bot's user.bot_forum_can_manage_topics flag is **not** set, the user cannot create or modify bot forum topics." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_FORUM_CREATE_FORBIDDEN";
	}
};
/** This bot is not designated as a "join guard" bot. This method is only available to bots that mediate user joins to chats. . */
var BotGuardNotSupportedError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "This bot is not designated as a \"join guard\" bot. This method is only available to bots that mediate user joins to chats. ." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_GUARD_NOT_SUPPORTED";
	}
};
/** This bot cannot assign [verification icons](https://core.telegram.org/api/bots/verification). */
var BotVerifierForbiddenError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "This bot cannot assign [verification icons](https://core.telegram.org/api/bots/verification)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BOT_VERIFIER_FORBIDDEN";
	}
};
/** Channel poll voters and reactions cannot be fetched to prevent deanonymization. */
var BroadcastForbiddenError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "Channel poll voters and reactions cannot be fetched to prevent deanonymization." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BROADCAST_FORBIDDEN";
	}
};
/** channel/supergroup not available. */
var ChannelPublicGroupNaError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "channel/supergroup not available." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHANNEL_PUBLIC_GROUP_NA";
	}
};
/** You cannot execute this action. */
var ChatActionForbiddenError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "You cannot execute this action." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_ACTION_FORBIDDEN";
	}
};
/** You do not have the rights to do this. */
var ChatAdminInviteRequiredError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "You do not have the rights to do this." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_ADMIN_INVITE_REQUIRED";
	}
};
/** You join the discussion group before commenting, see [here &raquo;](https://core.telegram.org/api/discussion#requiring-users-to-join-the-group) for more info. */
var ChatGuestSendForbiddenError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "You join the discussion group before commenting, see [here &raquo;](https://core.telegram.org/api/discussion#requiring-users-to-join-the-group) for more info." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_GUEST_SEND_FORBIDDEN";
	}
};
/** You can't send audio messages in this chat. */
var ChatSendAudiosForbiddenError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "You can't send audio messages in this chat." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_SEND_AUDIOS_FORBIDDEN";
	}
};
/** You can't send documents in this chat. */
var ChatSendDocsForbiddenError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "You can't send documents in this chat." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_SEND_DOCS_FORBIDDEN";
	}
};
/** You can't send a game to this chat. */
var ChatSendGameForbiddenError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "You can't send a game to this chat." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_SEND_GAME_FORBIDDEN";
	}
};
/** You can't send gifs in this chat. */
var ChatSendGifsForbiddenError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "You can't send gifs in this chat." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_SEND_GIFS_FORBIDDEN";
	}
};
/** You can't send media in this chat. */
var ChatSendMediaForbiddenError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "You can't send media in this chat." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_SEND_MEDIA_FORBIDDEN";
	}
};
/** You can't send photos in this chat. */
var ChatSendPhotosForbiddenError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "You can't send photos in this chat." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_SEND_PHOTOS_FORBIDDEN";
	}
};
/** You can't send non-media (text) messages in this chat. */
var ChatSendPlainForbiddenError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "You can't send non-media (text) messages in this chat." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_SEND_PLAIN_FORBIDDEN";
	}
};
/** You can't send polls in this chat. */
var ChatSendPollForbiddenError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "You can't send polls in this chat." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_SEND_POLL_FORBIDDEN";
	}
};
/** You can't send round videos to this chat. */
var ChatSendRoundvideosForbiddenError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "You can't send round videos to this chat." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_SEND_ROUNDVIDEOS_FORBIDDEN";
	}
};
/** You can't send stickers in this chat. */
var ChatSendStickersForbiddenError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "You can't send stickers in this chat." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_SEND_STICKERS_FORBIDDEN";
	}
};
/** You can't send videos in this chat. */
var ChatSendVideosForbiddenError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "You can't send videos in this chat." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_SEND_VIDEOS_FORBIDDEN";
	}
};
/** You can't send voice recordings in this chat. */
var ChatSendVoicesForbiddenError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "You can't send voice recordings in this chat." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_SEND_VOICES_FORBIDDEN";
	}
};
/** You can't send webpage previews to this chat. */
var ChatSendWebpageForbiddenError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "You can't send webpage previews to this chat." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_SEND_WEBPAGE_FORBIDDEN";
	}
};
/** The specified user type is invalid. */
var ChatTypeInvalidError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "The specified user type is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_TYPE_INVALID";
	}
};
/** Normal users can't edit invites that were created by bots. */
var EditBotInviteForbiddenError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "Normal users can't edit invites that were created by bots." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "EDIT_BOT_INVITE_FORBIDDEN";
	}
};
/** The groupcall has already started, you can join directly using [phone.joinGroupCall](https://core.telegram.org/method/phone.joinGroupCall). */
var GroupcallAlreadyStartedError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "The groupcall has already started, you can join directly using [phone.joinGroupCall](https://core.telegram.org/method/phone.joinGroupCall)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "GROUPCALL_ALREADY_STARTED";
	}
};
/** You cannot change this group call setting. */
var GroupcallChangeForbiddenError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "You cannot change this group call setting." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "GROUPCALL_CHANGE_FORBIDDEN";
	}
};
/** Only the inline bot can edit message. */
var InlineBotRequiredError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "Only the inline bot can edit message." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "INLINE_BOT_REQUIRED";
	}
};
/** Message author required. */
var MessageAuthorRequiredError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "Message author required." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MESSAGE_AUTHOR_REQUIRED";
	}
};
/** You can't delete one of the messages you tried to delete, most likely because it is a service message. */
var MessageDeleteForbiddenError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "You can't delete one of the messages you tried to delete, most likely because it is a service message." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MESSAGE_DELETE_FORBIDDEN";
	}
};
/** Cast a vote in the poll before calling this method. */
var PollVoteRequiredError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "Cast a vote in the poll before calling this method." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "POLL_VOTE_REQUIRED";
	}
};
/** You need a [Telegram Premium subscription](https://core.telegram.org/api/premium) to send a message to this user. */
var PrivacyPremiumRequiredError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "You need a [Telegram Premium subscription](https://core.telegram.org/api/premium) to send a message to this user." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PRIVACY_PREMIUM_REQUIRED";
	}
};
/** You can only export group call invite links for public chats or channels. */
var PublicChannelMissingError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "You can only export group call invite links for public chats or channels." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PUBLIC_CHANNEL_MISSING";
	}
};
/** Your admin rights do not allow you to do this. */
var RightForbiddenError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "Your admin rights do not allow you to do this." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "RIGHT_FORBIDDEN";
	}
};
/** You can't change your sensitive content settings. */
var SensitiveChangeForbiddenError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "You can't change your sensitive content settings." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SENSITIVE_CHANGE_FORBIDDEN";
	}
};
/** You can't send this secret message because the other participant deleted their account. */
var UserDeletedError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "You can't send this secret message because the other participant deleted their account." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USER_DELETED";
	}
};
/** The recipient user has configured restrictions on which categories of star gifts they're willing to accept (unique, limited, or unlimited): the sender attempted to get a payment form for a gift that falls into a category the recipient has blocked. */
var UserDisallowedStargiftsError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "The recipient user has configured restrictions on which categories of star gifts they're willing to accept (unique, limited, or unlimited): the sender attempted to get a payment form for a gift that falls into a category the recipient has blocked." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USER_DISALLOWED_STARGIFTS";
	}
};
/** The user hasn't granted or has revoked the bot's access to change their emoji status using [bots.toggleUserEmojiStatusPermission](https://core.telegram.org/method/bots.toggleUserEmojiStatusPermission). */
var UserPermissionDeniedError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "The user hasn't granted or has revoked the bot's access to change their emoji status using [bots.toggleUserEmojiStatusPermission](https://core.telegram.org/method/bots.toggleUserEmojiStatusPermission)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USER_PERMISSION_DENIED";
	}
};
/** The user's privacy settings do not allow you to do this. */
var UserPrivacyRestrictedError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "The user's privacy settings do not allow you to do this." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USER_PRIVACY_RESTRICTED";
	}
};
/** You're spamreported, you can't create channels or chats. */
var UserRestrictedError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "You're spamreported, you can't create channels or chats." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USER_RESTRICTED";
	}
};
/** You cannot fetch the read date of this message because you have disallowed other users to do so for *your* messages; to fix, allow other users to see *your* exact last online date OR purchase a [Telegram Premium](https://core.telegram.org/api/premium) subscription. */
var YourPrivacyRestrictedError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "You cannot fetch the read date of this message because you have disallowed other users to do so for *your* messages; to fix, allow other users to see *your* exact last online date OR purchase a [Telegram Premium](https://core.telegram.org/api/premium) subscription." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "YOUR_PRIVACY_RESTRICTED";
	}
};
/** This chat is not available to the current user. */
var ChatForbiddenError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "This chat is not available to the current user." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_FORBIDDEN";
	}
};
/** NOT_ALLOWED */
var NotAllowedError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "NOT_ALLOWED" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "NOT_ALLOWED";
	}
};
/** Please update the app to access the gift API. */
var ApiGiftRestrictedUpdateAppError = class extends require_errors_RPCBaseErrors.AuthKeyError {
	constructor(args) {
		const message = "Please update the app to access the gift API." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "API_GIFT_RESTRICTED_UPDATE_APP";
	}
};
/** The user is currently advertising a [Business Location](https://core.telegram.org/api/business#location), the location may only be changed (or removed) using [account.updateBusinessLocation &raquo;](https://core.telegram.org/method/account.updateBusinessLocation).  . */
var BusinessAddressActiveError = class extends require_errors_RPCBaseErrors.AuthKeyError {
	constructor(args) {
		const message = "The user is currently advertising a [Business Location](https://core.telegram.org/api/business#location), the location may only be changed (or removed) using [account.updateBusinessLocation &raquo;](https://core.telegram.org/method/account.updateBusinessLocation).  ." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "BUSINESS_ADDRESS_ACTIVE";
	}
};
/** The other side of the call does not support any of the VoIP protocols supported by the local client, as specified by the `protocol.layer` and `protocol.library_versions` fields. */
var CallProtocolCompatLayerInvalidError = class extends require_errors_RPCBaseErrors.AuthKeyError {
	constructor(args) {
		const message = "The other side of the call does not support any of the VoIP protocols supported by the local client, as specified by the `protocol.layer` and `protocol.library_versions` fields." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CALL_PROTOCOL_COMPAT_LAYER_INVALID";
	}
};
/** Message editing is temporarily forbidden for this user due to regulatory restrictions. */
var EditMessageTempRestrictedError = class extends require_errors_RPCBaseErrors.AuthKeyError {
	constructor(args) {
		const message = "Message editing is temporarily forbidden for this user due to regulatory restrictions." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "EDIT_MESSAGE_TEMP_RESTRICTED";
	}
};
/** The client has to be updated in order to support [file references](https://core.telegram.org/api/file-references). */
var FilerefUpgradeNeededError = class extends require_errors_RPCBaseErrors.AuthKeyError {
	constructor(args) {
		const message = "The client has to be updated in order to support [file references](https://core.telegram.org/api/file-references)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FILEREF_UPGRADE_NEEDED";
	}
};
/** You can't change phone number right after logging in, please wait at least 24 hours. */
var FreshChangePhoneForbiddenError = class extends require_errors_RPCBaseErrors.AuthKeyError {
	constructor(args) {
		const message = "You can't change phone number right after logging in, please wait at least 24 hours." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FRESH_CHANGE_PHONE_FORBIDDEN";
	}
};
/** You can't logout other sessions if less than 24 hours have passed since you logged on the current session. */
var FreshResetAuthorisationForbiddenError = class extends require_errors_RPCBaseErrors.AuthKeyError {
	constructor(args) {
		const message = "You can't logout other sessions if less than 24 hours have passed since you logged on the current session." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FRESH_RESET_AUTHORISATION_FORBIDDEN";
	}
};
/** A detailed description of the error will be received separately as described [here &raquo;](https://core.telegram.org/api/errors#406-not-acceptable). */
var PaymentUnsupportedError = class extends require_errors_RPCBaseErrors.AuthKeyError {
	constructor(args) {
		const message = "A detailed description of the error will be received separately as described [here &raquo;](https://core.telegram.org/api/errors#406-not-acceptable)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PAYMENT_UNSUPPORTED";
	}
};
/** You have tried logging in too many times. */
var PhonePasswordFloodError = class extends require_errors_RPCBaseErrors.AuthKeyError {
	constructor(args) {
		const message = "You have tried logging in too many times." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PHONE_PASSWORD_FLOOD";
	}
};
/** Users from the current user's country cannot vote in this [country-restricted poll &raquo;](https://core.telegram.org/api/poll#country-restricted-polls). */
var PollCountryRestrictedError = class extends require_errors_RPCBaseErrors.AuthKeyError {
	constructor(args) {
		const message = "Users from the current user's country cannot vote in this [country-restricted poll &raquo;](https://core.telegram.org/api/poll#country-restricted-polls)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "POLL_COUNTRY_RESTRICTED";
	}
};
/** Only channel subscribers can vote in this poll. */
var PollMemberRestrictedError = class extends require_errors_RPCBaseErrors.AuthKeyError {
	constructor(args) {
		const message = "Only channel subscribers can vote in this poll." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "POLL_MEMBER_RESTRICTED";
	}
};
/** Precheckout failed, a detailed and localized description for the error will be emitted via an [updateServiceNotification as specified here &raquo;](https://core.telegram.org/api/errors#406-not-acceptable). */
var PrecheckoutFailedError = class extends require_errors_RPCBaseErrors.AuthKeyError {
	constructor(args) {
		const message = "Precheckout failed, a detailed and localized description for the error will be emitted via an [updateServiceNotification as specified here &raquo;](https://core.telegram.org/api/errors#406-not-acceptable)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PRECHECKOUT_FAILED";
	}
};
/** You cannot currently purchase a Premium subscription. */
var PremiumCurrentlyUnavailableError = class extends require_errors_RPCBaseErrors.AuthKeyError {
	constructor(args) {
		const message = "You cannot currently purchase a Premium subscription." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PREMIUM_CURRENTLY_UNAVAILABLE";
	}
};
/** Import for this chat is already in progress, wait %d minutes before starting a new one. */
var PreviousChatImportActiveWaitMinError = class extends require_errors_RPCBaseErrors.AuthKeyError {
	constructor(args) {
		const value = Number(args.capture || 0);
		const message = "Import for this chat is already in progress, wait " + value + " minutes before starting a new one." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.value = value;
	}
};
/** Returned when all available options for this type of number were already used (e.g. flash-call, then SMS, then this error might be returned to trigger a second resend). */
var SendCodeUnavailableError = class extends require_errors_RPCBaseErrors.AuthKeyError {
	constructor(args) {
		const message = "Returned when all available options for this type of number were already used (e.g. flash-call, then SMS, then this error might be returned to trigger a second resend)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SEND_CODE_UNAVAILABLE";
	}
};
/** A gift export is in progress, a detailed and localized description for the error will be emitted via an [updateServiceNotification as specified here &raquo;](https://core.telegram.org/api/errors#406-not-acceptable). */
var StargiftExportInProgressError = class extends require_errors_RPCBaseErrors.AuthKeyError {
	constructor(args) {
		const message = "A gift export is in progress, a detailed and localized description for the error will be emitted via an [updateServiceNotification as specified here &raquo;](https://core.telegram.org/api/errors#406-not-acceptable)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARGIFT_EXPORT_IN_PROGRESS";
	}
};
/** The form amount has changed, please fetch the new form using [payments.getPaymentForm](https://core.telegram.org/method/payments.getPaymentForm) and restart the process. */
var StarsFormAmountMismatchError = class extends require_errors_RPCBaseErrors.AuthKeyError {
	constructor(args) {
		const message = "The form amount has changed, please fetch the new form using [payments.getPaymentForm](https://core.telegram.org/method/payments.getPaymentForm) and restart the process." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STARS_FORM_AMOUNT_MISMATCH";
	}
};
/** Provided stickerset can't be installed as group stickerset to prevent admin deanonymization. */
var StickersetOwnerAnonymousError = class extends require_errors_RPCBaseErrors.AuthKeyError {
	constructor(args) {
		const message = "Provided stickerset can't be installed as group stickerset to prevent admin deanonymization." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STICKERSET_OWNER_ANONYMOUS";
	}
};
/** Translations are unavailable, a detailed and localized description for the error will be emitted via an [updateServiceNotification as specified here &raquo;](https://core.telegram.org/api/errors#406-not-acceptable). */
var TranslationsDisabledError = class extends require_errors_RPCBaseErrors.AuthKeyError {
	constructor(args) {
		const message = "Translations are unavailable, a detailed and localized description for the error will be emitted via an [updateServiceNotification as specified here &raquo;](https://core.telegram.org/api/errors#406-not-acceptable)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TRANSLATIONS_DISABLED";
	}
};
/** Please update your client to login. */
var UpdateAppToLoginError = class extends require_errors_RPCBaseErrors.AuthKeyError {
	constructor(args) {
		const message = "Please update your client to login." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "UPDATE_APP_TO_LOGIN";
	}
};
/** You need to disable privacy settings for your profile picture in order to make your geolocation public. */
var UserpicPrivacyRequiredError = class extends require_errors_RPCBaseErrors.AuthKeyError {
	constructor(args) {
		const message = "You need to disable privacy settings for your profile picture in order to make your geolocation public." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "USERPIC_PRIVACY_REQUIRED";
	}
};
/** Concurrent usage of the current session from multiple connections was detected, the current session was invalidated by the server for security reasons! */
var AuthKeyDuplicatedError = class extends require_errors_RPCBaseErrors.AuthKeyError {
	constructor(args) {
		const message = "Concurrent usage of the current session from multiple connections was detected, the current session was invalidated by the server for security reasons!" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "AUTH_KEY_DUPLICATED";
	}
};
/** Similar to a flood wait, must wait %d minutes */
var PreviousChatImportActiveWaitXminError = class extends require_errors_RPCBaseErrors.AuthKeyError {
	constructor(args) {
		const message = "Similar to a flood wait, must wait %d minutes" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PREVIOUS_CHAT_IMPORT_ACTIVE_WAIT_XMIN";
	}
};
/** Since this account is active and protected by a 2FA password, we will delete it in 1 week for security purposes. You can cancel this process at any time, you'll be able to reset your account in %d seconds. */
var TwoFaConfirmWaitError = class extends require_errors_RPCBaseErrors.FloodError {
	constructor(args) {
		const value = Number(args.capture || 0);
		const message = "Since this account is active and protected by a 2FA password, we will delete it in 1 week for security purposes. You can cancel this process at any time, you'll be able to reset your account in " + value + " seconds." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.value = value;
	}
};
/** Please wait %d seconds before repeating the action. */
var FloodWaitError = class extends require_errors_RPCBaseErrors.FloodError {
	constructor(args) {
		const seconds = Number(args.capture || 0);
		const message = "Please wait " + seconds + " seconds before repeating the action." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.seconds = seconds;
	}
};
/** The current account is [frozen](https://core.telegram.org/api/auth#frozen-accounts), and thus cannot execute the specified action. */
var FrozenMethodInvalidError = class extends require_errors_RPCBaseErrors.FloodError {
	constructor(args) {
		const message = "The current account is [frozen](https://core.telegram.org/api/auth#frozen-accounts), and thus cannot execute the specified action." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "FROZEN_METHOD_INVALID";
	}
};
/** You already have a premium subscription active until unixtime %d . */
var PremiumSubActiveUntilError = class extends require_errors_RPCBaseErrors.FloodError {
	constructor(args) {
		const value = Number(args.capture || 0);
		const message = "You already have a premium subscription active until unixtime " + value + " ." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.value = value;
	}
};
/** Slowmode is enabled in this chat: wait %d seconds before sending another message to this chat. */
var SlowModeWaitError = class extends require_errors_RPCBaseErrors.FloodError {
	constructor(args) {
		const seconds = Number(args.capture || 0);
		const message = "Slowmode is enabled in this chat: wait " + seconds + " seconds before sending another message to this chat." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.seconds = seconds;
	}
};
/** Sorry, for security reasons, you will be able to begin downloading your data in %d seconds. We have notified all your devices about the export request to make sure it's authorized and to give you time to react if it's not. */
var TakeoutInitDelayError = class extends require_errors_RPCBaseErrors.FloodError {
	constructor(args) {
		const seconds = Number(args.capture || 0);
		const message = "Sorry, for security reasons, you will be able to begin downloading your data in " + seconds + " seconds. We have notified all your devices about the export request to make sure it's authorized and to give you time to react if it's not." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.seconds = seconds;
	}
};
/** A timeout occurred while composing the message. */
var AicomposeTimeoutError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "A timeout occurred while composing the message." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "AICOMPOSE_TIMEOUT";
	}
};
/** Internal error, please repeat the method call. */
var AuthKeyUnsynchronizedError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "Internal error, please repeat the method call." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "AUTH_KEY_UNSYNCHRONIZED";
	}
};
/** Internal error (debug info %d), please repeat the method call. */
var AuthRestartError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const value = Number(args.capture || 0);
		const message = "Internal error (debug info " + value + "), please repeat the method call." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.value = value;
	}
};
/** A server-side timeout occurred while reuploading the file to the CDN DC. */
var CdnUploadTimeoutError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "A server-side timeout occurred while reuploading the file to the CDN DC." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CDN_UPLOAD_TIMEOUT";
	}
};
/** Failure while generating the chat ID. */
var ChatIdGenerateFailedError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "Failure while generating the chat ID." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_ID_GENERATE_FAILED";
	}
};
/** The specified OAuth request is invalid. */
var OauthRequestInvalidError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "The specified OAuth request is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "OAUTH_REQUEST_INVALID";
	}
};
/** Channel internal replication issues, try again later (treat this like an RPC_CALL_FAIL). */
var PersistentTimestampOutdatedError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "Channel internal replication issues, try again later (treat this like an RPC_CALL_FAIL)." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PERSISTENT_TIMESTAMP_OUTDATED";
	}
};
/** The specified media is invalid. */
var SendMediaInvalidError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "The specified media is invalid." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SEND_MEDIA_INVALID";
	}
};
/** Failure while signing in. */
var SignInFailedError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "Failure while signing in." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "SIGN_IN_FAILED";
	}
};
/** Translation failed, please try again later. */
var TranslateReqFailedError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "Translation failed, please try again later." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TRANSLATE_REQ_FAILED";
	}
};
/** A timeout occurred while translating the specified text. */
var TranslationTimeoutError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "A timeout occurred while translating the specified text." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "TRANSLATION_TIMEOUT";
	}
};
/** CHAT_GET_FAILED */
var ChatGetFailedError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "CHAT_GET_FAILED" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHAT_GET_FAILED";
	}
};
/** The statistics cannot be retrieved at this time */
var ChpCallFailError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "The statistics cannot be retrieved at this time" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "CHP_CALL_FAIL";
	}
};
/** TDLib developer claimed it is not an error while accepting secret chats and 500 is used instead of 420 */
var EncryptionOccupyFailedError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "TDLib developer claimed it is not an error while accepting secret chats and 500 is used instead of 420" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ENCRYPTION_OCCUPY_FAILED";
	}
};
/** GROUPCALL_ADD_PARTICIPANTS_FAILED */
var GroupcallAddParticipantsFailedError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "GROUPCALL_ADD_PARTICIPANTS_FAILED" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "GROUPCALL_ADD_PARTICIPANTS_FAILED";
	}
};
/** Fetching of history failed */
var HistoryGetFailedError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "Fetching of history failed" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "HISTORY_GET_FAILED";
	}
};
/** An error occurred while communicating with DC %d */
var InterdcCallErrorError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const value = Number(args.capture || 0);
		const message = "An error occurred while communicating with DC " + value + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.value = value;
	}
};
/** A rich error occurred while communicating with DC %d */
var InterdcCallRichErrorError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const value = Number(args.capture || 0);
		const message = "A rich error occurred while communicating with DC " + value + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.value = value;
	}
};
/** An internal failure occurred while fetching user info (couldn't find location) */
var MemberNoLocationError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "An internal failure occurred while fetching user info (couldn't find location)" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MEMBER_NO_LOCATION";
	}
};
/** Occupation of primary member location failed */
var MemberOccupyPrimaryLocFailedError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "Occupation of primary member location failed" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MEMBER_OCCUPY_PRIMARY_LOC_FAILED";
	}
};
/** The request should be retried with a lower message ID */
var MsgidDecreaseRetryError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "The request should be retried with a lower message ID" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MSGID_DECREASE_RETRY";
	}
};
/** MT_SEND_QUEUE_TOO_LONG */
var MtSendQueueTooLongError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "MT_SEND_QUEUE_TOO_LONG" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MT_SEND_QUEUE_TOO_LONG";
	}
};
/** The provided chat is invalid */
var NeedChatInvalidError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "The provided chat is invalid" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "NEED_CHAT_INVALID";
	}
};
/** The provided member is invalid or does not exist (for example a thumb size) */
var NeedMemberInvalidError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "The provided member is invalid or does not exist (for example a thumb size)" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "NEED_MEMBER_INVALID";
	}
};
/** Failure while making call */
var ParticipantCallFailedError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "Failure while making call" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PARTICIPANT_CALL_FAILED";
	}
};
/** The postponed call has timed out */
var PostponedTimeoutError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "The postponed call has timed out" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "POSTPONED_TIMEOUT";
	}
};
/** No PTS change */
var PtsChangeEmptyError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "No PTS change" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "PTS_CHANGE_EMPTY";
	}
};
/** Failure while generating registration ID */
var RegIdGenerateFailedError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "Failure while generating registration ID" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "REG_ID_GENERATE_FAILED";
	}
};
/** Telegram is having internal issues, please try again later. */
var RpcCallFailError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "Telegram is having internal issues, please try again later." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "RPC_CALL_FAIL";
	}
};
/** Telegram is having internal issues, please try again later. */
var RpcMcgetFailError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "Telegram is having internal issues, please try again later." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "RPC_MCGET_FAIL";
	}
};
/** Server storage check failed */
var StorageCheckFailedError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "Server storage check failed" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STORAGE_CHECK_FAILED";
	}
};
/** STORE_INVALID_SCALAR_TYPE */
var StoreInvalidScalarTypeError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "STORE_INVALID_SCALAR_TYPE" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "STORE_INVALID_SCALAR_TYPE";
	}
};
/** The method you tried to call cannot be called on non-CDN DCs */
var UnknownMethodError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "The method you tried to call cannot be called on non-CDN DCs" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "UNKNOWN_METHOD";
	}
};
/** Telegram workers are too busy to respond immediately */
var WorkerBusyTooLongRetryError = class extends require_errors_RPCBaseErrors.ServerError {
	constructor(args) {
		const message = "Telegram workers are too busy to respond immediately" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "WORKER_BUSY_TOO_LONG_RETRY";
	}
};
/** Timeout while fetching data. */
var TimeoutError = class extends require_errors_RPCBaseErrors.TimedOutError {
	constructor(args) {
		const message = "Timeout while fetching data." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "Timeout";
	}
};
/** Spent too much time waiting for a previous query in the invokeAfterMsg request queue, aborting! */
var MsgWaitTimeoutError = class extends require_errors_RPCBaseErrors.TimedOutError {
	constructor(args) {
		const message = "Spent too much time waiting for a previous query in the invokeAfterMsg request queue, aborting!" + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "MSG_WAIT_TIMEOUT";
	}
};
/** Sorry, anonymous administrators cannot leave reactions or participate in polls. */
var AnonymousReactionsDisabledError = class extends require_errors_RPCBaseErrors.ForbiddenError {
	constructor(args) {
		const message = "Sorry, anonymous administrators cannot leave reactions or participate in polls." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.errorMessage = "ANONYMOUS_REACTIONS_DISABLED";
	}
};
/** A wait of %d seconds is required in the test servers before repeating the action. */
var FloodTestPhoneWaitError = class extends require_errors_RPCBaseErrors.FloodError {
	constructor(args) {
		const seconds = Number(args.capture || 0);
		const message = "A wait of " + seconds + " seconds is required in the test servers before repeating the action." + require_errors_RPCBaseErrors.RPCError._fmtRequest(args.request);
		super(message, args.request);
		this.message = message;
		this.seconds = seconds;
	}
};
const rpcErrorsDict = /* @__PURE__ */ new Map([
	["ABOUT_TOO_LONG", AboutTooLongError],
	["ACCESS_TOKEN_EXPIRED", AccessTokenExpiredError],
	["ACCESS_TOKEN_INVALID", AccessTokenInvalidError],
	["AD_EXPIRED", AdExpiredError],
	["ADDRESS_INVALID", AddressInvalidError],
	["ADMIN_ID_INVALID", AdminIdInvalidError],
	["ADMIN_RANK_EMOJI_NOT_ALLOWED", AdminRankEmojiNotAllowedError],
	["ADMIN_RANK_INVALID", AdminRankInvalidError],
	["ADMIN_RIGHTS_EMPTY", AdminRightsEmptyError],
	["ADMINS_TOO_MUCH", AdminsTooMuchError],
	["AI_COMPOSE_TASK_MISSING", AiComposeTaskMissingError],
	["AICOMPOSE_FLOOD_PREMIUM", AicomposeFloodPremiumError],
	["AICOMPOSE_TONE_INVALID", AicomposeToneInvalidError],
	["AICOMPOSE_TONE_TITLE_INVALID", AicomposeToneTitleInvalidError],
	["ALBUM_PHOTOS_TOO_MANY", AlbumPhotosTooManyError],
	["API_ID_INVALID", ApiIdInvalidError],
	["API_ID_PUBLISHED_FLOOD", ApiIdPublishedFloodError],
	["ARTICLE_TITLE_EMPTY", ArticleTitleEmptyError],
	["AUDIO_CONTENT_URL_EMPTY", AudioContentUrlEmptyError],
	["AUDIO_TITLE_EMPTY", AudioTitleEmptyError],
	["AUTH_BYTES_INVALID", AuthBytesInvalidError],
	["AUTH_TOKEN_ALREADY_ACCEPTED", AuthTokenAlreadyAcceptedError],
	["AUTH_TOKEN_EXCEPTION", AuthTokenExceptionError],
	["AUTH_TOKEN_EXPIRED", AuthTokenExpiredError],
	["AUTH_TOKEN_INVALID", AuthTokenInvalidError],
	["AUTH_TOKEN_INVALIDX", AuthTokenInvalidxError],
	["AUTOARCHIVE_NOT_AVAILABLE", AutoarchiveNotAvailableError],
	["BALANCE_TOO_LOW", BalanceTooLowError],
	["BANK_CARD_NUMBER_INVALID", BankCardNumberInvalidError],
	["BANNED_RIGHTS_INVALID", BannedRightsInvalidError],
	["BIRTHDAY_ALREADY", BirthdayAlreadyError],
	["BIRTHDAY_INVALID", BirthdayInvalidError],
	["BOOST_NOT_MODIFIED", BoostNotModifiedError],
	["BOOST_PEER_INVALID", BoostPeerInvalidError],
	["BOOSTS_EMPTY", BoostsEmptyError],
	["BOOSTS_REQUIRED", BoostsRequiredError],
	["BOT_ALREADY_DISABLED", BotAlreadyDisabledError],
	["BOT_APP_BOT_INVALID", BotAppBotInvalidError],
	["BOT_APP_INVALID", BotAppInvalidError],
	["BOT_APP_SHORTNAME_INVALID", BotAppShortnameInvalidError],
	["BOT_BUSINESS_MISSING", BotBusinessMissingError],
	["BOT_CHANNELS_NA", BotChannelsNaError],
	["BOT_COMMAND_DESCRIPTION_INVALID", BotCommandDescriptionInvalidError],
	["BOT_COMMAND_INVALID", BotCommandInvalidError],
	["BOT_CREATE_LIMIT_EXCEEDED", BotCreateLimitExceededError],
	["BOT_DOMAIN_INVALID", BotDomainInvalidError],
	["BOT_FALLBACK_UNSUPPORTED", BotFallbackUnsupportedError],
	["BOT_GAMES_DISABLED", BotGamesDisabledError],
	["BOT_GROUPS_BLOCKED", BotGroupsBlockedError],
	["BOT_ID_INVALID", BotIdInvalidError],
	["BOT_INLINE_DISABLED", BotInlineDisabledError],
	["BOT_INVALID", BotInvalidError],
	["BOT_INVOICE_INVALID", BotInvoiceInvalidError],
	["BOT_NOT_CONNECTED_YET", BotNotConnectedYetError],
	["BOT_ONESIDE_NOT_AVAIL", BotOnesideNotAvailError],
	["BOT_PAYMENTS_DISABLED", BotPaymentsDisabledError],
	["BOT_RESPONSE_TIMEOUT", BotResponseTimeoutError],
	["BOT_SCORE_NOT_MODIFIED", BotScoreNotModifiedError],
	["BOT_WEBVIEW_DISABLED", BotWebviewDisabledError],
	["BOTS_TOO_MUCH", BotsTooMuchError],
	["BROADCAST_ID_INVALID", BroadcastIdInvalidError],
	["BROADCAST_PUBLIC_VOTERS_FORBIDDEN", BroadcastPublicVotersForbiddenError],
	["BROADCAST_REQUIRED", BroadcastRequiredError],
	["BUSINESS_CONNECTION_INVALID", BusinessConnectionInvalidError],
	["BUSINESS_CONNECTION_NOT_ALLOWED", BusinessConnectionNotAllowedError],
	["BUSINESS_PEER_INVALID", BusinessPeerInvalidError],
	["BUSINESS_PEER_USAGE_MISSING", BusinessPeerUsageMissingError],
	["BUSINESS_RECIPIENTS_EMPTY", BusinessRecipientsEmptyError],
	["BUSINESS_WORK_HOURS_EMPTY", BusinessWorkHoursEmptyError],
	["BUSINESS_WORK_HOURS_PERIOD_INVALID", BusinessWorkHoursPeriodInvalidError],
	["BUTTON_COPY_TEXT_INVALID", ButtonCopyTextInvalidError],
	["BUTTON_DATA_INVALID", ButtonDataInvalidError],
	["BUTTON_ID_INVALID", ButtonIdInvalidError],
	["BUTTON_INVALID", ButtonInvalidError],
	["BUTTON_POS_INVALID", ButtonPosInvalidError],
	["BUTTON_TEXT_INVALID", ButtonTextInvalidError],
	["BUTTON_TYPE_INVALID", ButtonTypeInvalidError],
	["BUTTON_URL_INVALID", ButtonUrlInvalidError],
	["BUTTON_USER_INVALID", ButtonUserInvalidError],
	["BUTTON_USER_PRIVACY_RESTRICTED", ButtonUserPrivacyRestrictedError],
	["CALL_ALREADY_ACCEPTED", CallAlreadyAcceptedError],
	["CALL_ALREADY_DECLINED", CallAlreadyDeclinedError],
	["CALL_NOT_ACTIVE", CallNotActiveError],
	["CALL_OCCUPY_FAILED", CallOccupyFailedError],
	["CALL_PEER_INVALID", CallPeerInvalidError],
	["CALL_PROTOCOL_FLAGS_INVALID", CallProtocolFlagsInvalidError],
	["CALL_PROTOCOL_LAYER_INVALID", CallProtocolLayerInvalidError],
	["CDN_METHOD_INVALID", CdnMethodInvalidError],
	["CHANNEL_FORUM_MISSING", ChannelForumMissingError],
	["CHANNEL_ID_INVALID", ChannelIdInvalidError],
	["CHANNEL_INVALID", ChannelInvalidError],
	["CHANNEL_MONOFORUM_UNSUPPORTED", ChannelMonoforumUnsupportedError],
	["CHANNEL_PARICIPANT_MISSING", ChannelParicipantMissingError],
	["CHANNEL_PRIVATE", ChannelPrivateError],
	["CHANNEL_TOO_BIG", ChannelTooBigError],
	["CHANNEL_TOO_LARGE", ChannelTooLargeError],
	["CHANNELS_ADMIN_LOCATED_TOO_MUCH", ChannelsAdminLocatedTooMuchError],
	["CHANNELS_ADMIN_PUBLIC_TOO_MUCH", ChannelsAdminPublicTooMuchError],
	["CHANNELS_TOO_MUCH", ChannelsTooMuchError],
	["CHARGE_ALREADY_REFUNDED", ChargeAlreadyRefundedError],
	["CHARGE_ID_EMPTY", ChargeIdEmptyError],
	["CHARGE_ID_INVALID", ChargeIdInvalidError],
	["CHAT_ABOUT_NOT_MODIFIED", ChatAboutNotModifiedError],
	["CHAT_ABOUT_TOO_LONG", ChatAboutTooLongError],
	["CHAT_ADMIN_REQUIRED", ChatAdminRequiredError],
	["CHAT_DISCUSSION_UNALLOWED", ChatDiscussionUnallowedError],
	["CHAT_FORWARDS_RESTRICTED", ChatForwardsRestrictedError],
	["CHAT_ID_EMPTY", ChatIdEmptyError],
	["CHAT_ID_INVALID", ChatIdInvalidError],
	["CHAT_INVALID", ChatInvalidError],
	["CHAT_INVITE_PERMANENT", ChatInvitePermanentError],
	["CHAT_LINK_EXISTS", ChatLinkExistsError],
	["CHAT_MEMBER_ADD_FAILED", ChatMemberAddFailedError],
	["CHAT_NOT_MODIFIED", ChatNotModifiedError],
	["CHAT_PUBLIC_REQUIRED", ChatPublicRequiredError],
	["CHAT_RESTRICTED", ChatRestrictedError],
	["CHAT_REVOKE_DATE_UNSUPPORTED", ChatRevokeDateUnsupportedError],
	["CHAT_SEND_INLINE_FORBIDDEN", ChatSendInlineForbiddenError],
	["CHAT_TITLE_EMPTY", ChatTitleEmptyError],
	["CHAT_TOO_BIG", ChatTooBigError],
	["CHAT_WRITE_FORBIDDEN", ChatWriteForbiddenError],
	["CHATLINK_SLUG_EMPTY", ChatlinkSlugEmptyError],
	["CHATLINK_SLUG_EXPIRED", ChatlinkSlugExpiredError],
	["CHATLINKS_TOO_MUCH", ChatlinksTooMuchError],
	["CHATLIST_EXCLUDE_INVALID", ChatlistExcludeInvalidError],
	["CHATLISTS_TOO_MUCH", ChatlistsTooMuchError],
	["CODE_EMPTY", CodeEmptyError],
	["CODE_HASH_INVALID", CodeHashInvalidError],
	["CODE_INVALID", CodeInvalidError],
	["COLLECTIBLE_INVALID", CollectibleInvalidError],
	["COLLECTIBLE_NOT_FOUND", CollectibleNotFoundError],
	["COLLECTION_ID_INVALID", CollectionIdInvalidError],
	["COLOR_INVALID", ColorInvalidError],
	["CONNECTION_API_ID_INVALID", ConnectionApiIdInvalidError],
	["CONNECTION_APP_VERSION_EMPTY", ConnectionAppVersionEmptyError],
	["CONNECTION_ID_INVALID", ConnectionIdInvalidError],
	["CONNECTION_LAYER_INVALID", ConnectionLayerInvalidError],
	["CONTACT_ADD_MISSING", ContactAddMissingError],
	["CONTACT_ID_INVALID", ContactIdInvalidError],
	["CONTACT_MISSING", ContactMissingError],
	["CONTACT_NAME_EMPTY", ContactNameEmptyError],
	["CONTACT_REQ_MISSING", ContactReqMissingError],
	["CREATE_CALL_FAILED", CreateCallFailedError],
	["CREDENTIAL_INVALID", CredentialInvalidError],
	["CURRENCY_TOTAL_AMOUNT_INVALID", CurrencyTotalAmountInvalidError],
	["CUSTOM_REACTIONS_TOO_MANY", CustomReactionsTooManyError],
	["DATA_HASH_SIZE_INVALID", DataHashSizeInvalidError],
	["DATA_INVALID", DataInvalidError],
	["DATA_JSON_INVALID", DataJsonInvalidError],
	["DATA_TOO_LONG", DataTooLongError],
	["DATE_EMPTY", DateEmptyError],
	["DC_ID_INVALID", DcIdInvalidError],
	["DH_G_A_INVALID", DhGAInvalidError],
	["DOCUMENT_INVALID", DocumentInvalidError],
	["EFFECT_CHAT_INVALID", EffectChatInvalidError],
	["EFFECT_ID_INVALID", EffectIdInvalidError],
	["EMAIL_HASH_EXPIRED", EmailHashExpiredError],
	["EMAIL_INSTALL_MISSING", EmailInstallMissingError],
	["EMAIL_INVALID", EmailInvalidError],
	["EMAIL_NOT_ALLOWED", EmailNotAllowedError],
	["EMAIL_NOT_SETUP", EmailNotSetupError],
	["EMAIL_UNCONFIRMED", EmailUnconfirmedError],
	["EMAIL_VERIFY_EXPIRED", EmailVerifyExpiredError],
	["EMOJI_INVALID", EmojiInvalidError],
	["EMOJI_MARKUP_INVALID", EmojiMarkupInvalidError],
	["EMOJI_NOT_MODIFIED", EmojiNotModifiedError],
	["EMOTICON_EMPTY", EmoticonEmptyError],
	["EMOTICON_INVALID", EmoticonInvalidError],
	["EMOTICON_STICKERPACK_MISSING", EmoticonStickerpackMissingError],
	["ENCRYPTED_MESSAGE_INVALID", EncryptedMessageInvalidError],
	["ENCRYPTION_ALREADY_ACCEPTED", EncryptionAlreadyAcceptedError],
	["ENCRYPTION_ALREADY_DECLINED", EncryptionAlreadyDeclinedError],
	["ENCRYPTION_DECLINED", EncryptionDeclinedError],
	["ENCRYPTION_ID_INVALID", EncryptionIdInvalidError],
	["ENTITIES_TOO_LONG", EntitiesTooLongError],
	["ENTITY_BOUNDS_INVALID", EntityBoundsInvalidError],
	["ENTITY_DATE_FORMAT_INVALID", EntityDateFormatInvalidError],
	["ENTITY_DATE_INVALID", EntityDateInvalidError],
	["ENTITY_DATE_TOO_LONG", EntityDateTooLongError],
	["ENTITY_MENTION_USER_INVALID", EntityMentionUserInvalidError],
	["ERROR_TEXT_EMPTY", ErrorTextEmptyError],
	["EXPIRE_DATE_INVALID", ExpireDateInvalidError],
	["EXPIRES_AT_INVALID", ExpiresAtInvalidError],
	["EXPORT_CARD_INVALID", ExportCardInvalidError],
	["EXTENDED_MEDIA_AMOUNT_INVALID", ExtendedMediaAmountInvalidError],
	["EXTENDED_MEDIA_EMPTY", ExtendedMediaEmptyError],
	["EXTENDED_MEDIA_INVALID", ExtendedMediaInvalidError],
	["EXTENDED_MEDIA_PEER_INVALID", ExtendedMediaPeerInvalidError],
	["EXTERNAL_URL_INVALID", ExternalUrlInvalidError],
	["FILE_CONTENT_TYPE_INVALID", FileContentTypeInvalidError],
	["FILE_EMTPY", FileEmtpyError],
	["FILE_ID_INVALID", FileIdInvalidError],
	["FILE_PART_EMPTY", FilePartEmptyError],
	["FILE_PART_INVALID", FilePartInvalidError],
	["FILE_PART_LENGTH_INVALID", FilePartLengthInvalidError],
	["FILE_PART_SIZE_CHANGED", FilePartSizeChangedError],
	["FILE_PART_SIZE_INVALID", FilePartSizeInvalidError],
	["FILE_PART_TOO_BIG", FilePartTooBigError],
	["FILE_PART_TOO_SMALL", FilePartTooSmallError],
	["FILE_PARTS_INVALID", FilePartsInvalidError],
	["FILE_REFERENCE_EMPTY", FileReferenceEmptyError],
	["FILE_REFERENCE_EXPIRED", FileReferenceExpiredError],
	["FILE_REFERENCE_INVALID", FileReferenceInvalidError],
	["FILE_TITLE_EMPTY", FileTitleEmptyError],
	["FILE_TOKEN_INVALID", FileTokenInvalidError],
	["FILTER_ID_INVALID", FilterIdInvalidError],
	["FILTER_INCLUDE_EMPTY", FilterIncludeEmptyError],
	["FILTER_NOT_SUPPORTED", FilterNotSupportedError],
	["FILTER_TITLE_EMPTY", FilterTitleEmptyError],
	["FIRSTNAME_INVALID", FirstnameInvalidError],
	["FOLDER_ID_EMPTY", FolderIdEmptyError],
	["FOLDER_ID_INVALID", FolderIdInvalidError],
	["FORM_EXPIRED", FormExpiredError],
	["FORM_ID_EMPTY", FormIdEmptyError],
	["FORM_SUBMIT_DUPLICATE", FormSubmitDuplicateError],
	["FORM_UNSUPPORTED", FormUnsupportedError],
	["FORUM_ENABLED", ForumEnabledError],
	["FRESH_CHANGE_ADMINS_FORBIDDEN", FreshChangeAdminsForbiddenError],
	["FROM_MESSAGE_BOT_DISABLED", FromMessageBotDisabledError],
	["FROM_PEER_INVALID", FromPeerInvalidError],
	["FROZEN_PARTICIPANT_MISSING", FrozenParticipantMissingError],
	["GAME_BOT_INVALID", GameBotInvalidError],
	["GENERAL_MODIFY_ICON_FORBIDDEN", GeneralModifyIconForbiddenError],
	["GEO_POINT_INVALID", GeoPointInvalidError],
	["GIF_CONTENT_TYPE_INVALID", GifContentTypeInvalidError],
	["GIF_ID_INVALID", GifIdInvalidError],
	["GIFT_MONTHS_INVALID", GiftMonthsInvalidError],
	["GIFT_SLUG_EXPIRED", GiftSlugExpiredError],
	["GIFT_SLUG_INVALID", GiftSlugInvalidError],
	["GIFT_STARS_INVALID", GiftStarsInvalidError],
	["GRAPH_EXPIRED_RELOAD", GraphExpiredReloadError],
	["GRAPH_INVALID_RELOAD", GraphInvalidReloadError],
	["GRAPH_OUTDATED_RELOAD", GraphOutdatedReloadError],
	["GROUPCALL_ALREADY_DISCARDED", GroupcallAlreadyDiscardedError],
	["GROUPCALL_FORBIDDEN", GroupcallForbiddenError],
	["GROUPCALL_INVALID", GroupcallInvalidError],
	["GROUPCALL_JOIN_MISSING", GroupcallJoinMissingError],
	["GROUPCALL_NOT_MODIFIED", GroupcallNotModifiedError],
	["GROUPCALL_SSRC_DUPLICATE_MUCH", GroupcallSsrcDuplicateMuchError],
	["GROUPED_MEDIA_INVALID", GroupedMediaInvalidError],
	["HASH_INVALID", HashInvalidError],
	["HASH_SIZE_INVALID", HashSizeInvalidError],
	["HASHTAG_INVALID", HashtagInvalidError],
	["HIDE_REQUESTER_MISSING", HideRequesterMissingError],
	["ID_EXPIRED", IdExpiredError],
	["ID_INVALID", IdInvalidError],
	["IMAGE_PROCESS_FAILED", ImageProcessFailedError],
	["IMPORT_FILE_INVALID", ImportFileInvalidError],
	["IMPORT_FORMAT_DATE_INVALID", ImportFormatDateInvalidError],
	["IMPORT_FORMAT_UNRECOGNIZED", ImportFormatUnrecognizedError],
	["IMPORT_ID_INVALID", ImportIdInvalidError],
	["IMPORT_TOKEN_INVALID", ImportTokenInvalidError],
	["INLINE_RESULT_EXPIRED", InlineResultExpiredError],
	["INPUT_CHATLIST_INVALID", InputChatlistInvalidError],
	["INPUT_FILE_INVALID", InputFileInvalidError],
	["INPUT_FILTER_INVALID", InputFilterInvalidError],
	["INPUT_PEERS_EMPTY", InputPeersEmptyError],
	["INPUT_PURPOSE_INVALID", InputPurposeInvalidError],
	["INPUT_STARS_AMOUNT_INVALID", InputStarsAmountInvalidError],
	["INPUT_STARS_NANOS_INVALID", InputStarsNanosInvalidError],
	["INPUT_TEXT_EMPTY", InputTextEmptyError],
	["INPUT_TEXT_TOO_LONG", InputTextTooLongError],
	["INPUT_USER_DEACTIVATED", InputUserDeactivatedError],
	["INVITE_FORBIDDEN_WITH_JOINAS", InviteForbiddenWithJoinasError],
	["INVITE_HASH_EMPTY", InviteHashEmptyError],
	["INVITE_HASH_EXPIRED", InviteHashExpiredError],
	["INVITE_HASH_INVALID", InviteHashInvalidError],
	["INVITE_REQUEST_SENT", InviteRequestSentError],
	["INVITE_REVOKED_MISSING", InviteRevokedMissingError],
	["INVITE_SLUG_EMPTY", InviteSlugEmptyError],
	["INVITE_SLUG_EXPIRED", InviteSlugExpiredError],
	["INVITE_SLUG_INVALID", InviteSlugInvalidError],
	["INVITES_TOO_MUCH", InvitesTooMuchError],
	["INVOICE_INVALID", InvoiceInvalidError],
	["INVOICE_PAYLOAD_INVALID", InvoicePayloadInvalidError],
	["JOIN_AS_PEER_INVALID", JoinAsPeerInvalidError],
	["LANG_CODE_INVALID", LangCodeInvalidError],
	["LANG_CODE_NOT_SUPPORTED", LangCodeNotSupportedError],
	["LANG_PACK_INVALID", LangPackInvalidError],
	["LANGUAGE_INVALID", LanguageInvalidError],
	["LASTNAME_INVALID", LastnameInvalidError],
	["LIMIT_INVALID", LimitInvalidError],
	["LIMIT_PER_POST_INVALID", LimitPerPostInvalidError],
	["LINK_NOT_MODIFIED", LinkNotModifiedError],
	["LOCATION_INVALID", LocationInvalidError],
	["MANAGER_INVALID", ManagerInvalidError],
	["MANAGER_PERMISSION_MISSING", ManagerPermissionMissingError],
	["MAX_DATE_INVALID", MaxDateInvalidError],
	["MAX_ID_INVALID", MaxIdInvalidError],
	["MAX_QTS_INVALID", MaxQtsInvalidError],
	["MD5_CHECKSUM_INVALID", Md5ChecksumInvalidError],
	["MEDIA_ALREADY_PAID", MediaAlreadyPaidError],
	["MEDIA_CAPTION_TOO_LONG", MediaCaptionTooLongError],
	["MEDIA_EMPTY", MediaEmptyError],
	["MEDIA_FILE_INVALID", MediaFileInvalidError],
	["MEDIA_GROUPED_INVALID", MediaGroupedInvalidError],
	["MEDIA_INVALID", MediaInvalidError],
	["MEDIA_NEW_INVALID", MediaNewInvalidError],
	["MEDIA_PREV_INVALID", MediaPrevInvalidError],
	["MEDIA_TTL_INVALID", MediaTtlInvalidError],
	["MEDIA_TYPE_INVALID", MediaTypeInvalidError],
	["MEDIA_VIDEO_STORY_MISSING", MediaVideoStoryMissingError],
	["MEGAGROUP_GEO_REQUIRED", MegagroupGeoRequiredError],
	["MEGAGROUP_ID_INVALID", MegagroupIdInvalidError],
	["MEGAGROUP_PREHISTORY_HIDDEN", MegagroupPrehistoryHiddenError],
	["MEGAGROUP_REQUIRED", MegagroupRequiredError],
	["MESSAGE_EDIT_TIME_EXPIRED", MessageEditTimeExpiredError],
	["MESSAGE_EMPTY", MessageEmptyError],
	["MESSAGE_ID_INVALID", MessageIdInvalidError],
	["MESSAGE_IDS_EMPTY", MessageIdsEmptyError],
	["MESSAGE_NOT_MODIFIED", MessageNotModifiedError],
	["MESSAGE_NOT_READ_YET", MessageNotReadYetError],
	["MESSAGE_POLL_CLOSED", MessagePollClosedError],
	["MESSAGE_REQUIRED", MessageRequiredError],
	["MESSAGE_TOO_LONG", MessageTooLongError],
	["MESSAGE_TOO_OLD", MessageTooOldError],
	["METHOD_INVALID", MethodInvalidError],
	["MIN_DATE_INVALID", MinDateInvalidError],
	["MONTH_INVALID", MonthInvalidError],
	["MSG_ID_INVALID", MsgIdInvalidError],
	["MSG_TOO_OLD", MsgTooOldError],
	["MSG_VOICE_MISSING", MsgVoiceMissingError],
	["MSG_VOICE_TOO_LONG", MsgVoiceTooLongError],
	["MSG_WAIT_FAILED", MsgWaitError],
	["MULTI_MEDIA_TOO_LONG", MultiMediaTooLongError],
	["NAME_INVALID", NameInvalidError],
	["NEED_ACTION_MISSING", NeedActionMissingError],
	["NEW_SALT_INVALID", NewSaltInvalidError],
	["NEW_SETTINGS_EMPTY", NewSettingsEmptyError],
	["NEW_SETTINGS_INVALID", NewSettingsInvalidError],
	["NEXT_OFFSET_INVALID", NextOffsetInvalidError],
	["NO_PAYMENT_NEEDED", NoPaymentNeededError],
	["NOGENERAL_HIDE_FORBIDDEN", NogeneralHideForbiddenError],
	["NOT_ELIGIBLE", NotEligibleError],
	["NOT_JOINED", NotJoinedError],
	["OFFSET_INVALID", OffsetInvalidError],
	["OFFSET_PEER_ID_INVALID", OffsetPeerIdInvalidError],
	["OPTION_INVALID", OptionInvalidError],
	["OPTIONS_TOO_MUCH", OptionsTooMuchError],
	["ORDER_INVALID", OrderInvalidError],
	["PACK_SHORT_NAME_INVALID", PackShortNameInvalidError],
	["PACK_SHORT_NAME_OCCUPIED", PackShortNameOccupiedError],
	["PACK_TITLE_INVALID", PackTitleInvalidError],
	["PACK_TYPE_INVALID", PackTypeInvalidError],
	["PARENT_PEER_INVALID", ParentPeerInvalidError],
	["PARTICIPANT_ID_INVALID", ParticipantIdInvalidError],
	["PARTICIPANT_JOIN_MISSING", ParticipantJoinMissingError],
	["PARTICIPANT_VERSION_OUTDATED", ParticipantVersionOutdatedError],
	["PARTICIPANTS_TOO_FEW", ParticipantsTooFewError],
	["PASSKEY_ORIGIN_MISMATCH", PasskeyOriginMismatchError],
	["PASSWORD_EMPTY", PasswordEmptyError],
	["PASSWORD_HASH_INVALID", PasswordHashInvalidError],
	["PASSWORD_MISSING", PasswordMissingError],
	["PASSWORD_RECOVERY_EXPIRED", PasswordRecoveryExpiredError],
	["PASSWORD_RECOVERY_NA", PasswordRecoveryNaError],
	["PASSWORD_REQUIRED", PasswordRequiredError],
	["PAYMENT_CREDENTIALS_INVALID", PaymentCredentialsInvalidError],
	["PAYMENT_PROVIDER_INVALID", PaymentProviderInvalidError],
	["PAYMENT_REQUIRED", PaymentRequiredError],
	["PEER_HISTORY_EMPTY", PeerHistoryEmptyError],
	["PEER_ID_INVALID", PeerIdInvalidError],
	["PEER_ID_NOT_SUPPORTED", PeerIdNotSupportedError],
	["PEER_TYPES_INVALID", PeerTypesInvalidError],
	["PEERS_LIST_EMPTY", PeersListEmptyError],
	["PERSISTENT_TIMESTAMP_EMPTY", PersistentTimestampEmptyError],
	["PERSISTENT_TIMESTAMP_INVALID", PersistentTimestampInvalidError],
	["PHONE_CODE_EMPTY", PhoneCodeEmptyError],
	["PHONE_CODE_EXPIRED", PhoneCodeExpiredError],
	["PHONE_CODE_HASH_EMPTY", PhoneCodeHashEmptyError],
	["PHONE_CODE_INVALID", PhoneCodeInvalidError],
	["PHONE_HASH_EXPIRED", PhoneHashExpiredError],
	["PHONE_NOT_OCCUPIED", PhoneNotOccupiedError],
	["PHONE_NUMBER_APP_SIGNUP_FORBIDDEN", PhoneNumberAppSignupForbiddenError],
	["PHONE_NUMBER_BANNED", PhoneNumberBannedError],
	["PHONE_NUMBER_FLOOD", PhoneNumberFloodError],
	["PHONE_NUMBER_INVALID", PhoneNumberInvalidError],
	["PHONE_NUMBER_OCCUPIED", PhoneNumberOccupiedError],
	["PHONE_NUMBER_UNOCCUPIED", PhoneNumberUnoccupiedError],
	["PHONE_PASSWORD_PROTECTED", PhonePasswordProtectedError],
	["PHOTO_CONTENT_TYPE_INVALID", PhotoContentTypeInvalidError],
	["PHOTO_CONTENT_URL_EMPTY", PhotoContentUrlEmptyError],
	["PHOTO_CROP_FILE_MISSING", PhotoCropFileMissingError],
	["PHOTO_CROP_SIZE_SMALL", PhotoCropSizeSmallError],
	["PHOTO_EXT_INVALID", PhotoExtInvalidError],
	["PHOTO_FILE_MISSING", PhotoFileMissingError],
	["PHOTO_ID_INVALID", PhotoIdInvalidError],
	["PHOTO_INVALID", PhotoInvalidError],
	["PHOTO_INVALID_DIMENSIONS", PhotoInvalidDimensionsError],
	["PHOTO_SAVE_FILE_INVALID", PhotoSaveFileInvalidError],
	["PHOTO_THUMB_URL_EMPTY", PhotoThumbUrlEmptyError],
	["PIN_RESTRICTED", PinRestrictedError],
	["PINNED_DIALOGS_TOO_MUCH", PinnedDialogsTooMuchError],
	["PINNED_TOO_MUCH", PinnedTooMuchError],
	["PINNED_TOPIC_NOT_MODIFIED", PinnedTopicNotModifiedError],
	["POLL_ANSWER_INVALID", PollAnswerInvalidError],
	["POLL_ANSWERS_INVALID", PollAnswersInvalidError],
	["POLL_OPTION_DUPLICATE", PollOptionDuplicateError],
	["POLL_OPTION_INVALID", PollOptionInvalidError],
	["POLL_QUESTION_INVALID", PollQuestionInvalidError],
	["PREMIUM_ACCOUNT_REQUIRED", PremiumAccountRequiredError],
	["PREMIUM_PURPOSE_INVALID", PremiumPurposeInvalidError],
	["PRICING_CHAT_INVALID", PricingChatInvalidError],
	["PRIVACY_KEY_INVALID", PrivacyKeyInvalidError],
	["PRIVACY_TOO_LONG", PrivacyTooLongError],
	["PRIVACY_VALUE_INVALID", PrivacyValueInvalidError],
	["PUBLIC_BROADCAST_EXPECTED", PublicBroadcastExpectedError],
	["PUBLIC_KEY_INVALID", PublicKeyInvalidError],
	["PUBLIC_KEY_REQUIRED", PublicKeyRequiredError],
	["PURPOSE_INVALID", PurposeInvalidError],
	["QUERY_ID_EMPTY", QueryIdEmptyError],
	["QUERY_ID_INVALID", QueryIdInvalidError],
	["QUERY_TOO_SHORT", QueryTooShortError],
	["QUICK_REPLIES_BOT_NOT_ALLOWED", QuickRepliesBotNotAllowedError],
	["QUICK_REPLIES_TOO_MUCH", QuickRepliesTooMuchError],
	["QUIZ_ANSWER_MISSING", QuizAnswerMissingError],
	["QUIZ_CORRECT_ANSWER_INVALID", QuizCorrectAnswerInvalidError],
	["QUIZ_CORRECT_ANSWERS_EMPTY", QuizCorrectAnswersEmptyError],
	["QUIZ_CORRECT_ANSWERS_TOO_MUCH", QuizCorrectAnswersTooMuchError],
	["QUIZ_MULTIPLE_INVALID", QuizMultipleInvalidError],
	["QUOTE_TEXT_INVALID", QuoteTextInvalidError],
	["RAISE_HAND_FORBIDDEN", RaiseHandForbiddenError],
	["RANDOM_ID_DUPLICATE", RandomIdDuplicateError],
	["RANDOM_ID_EMPTY", RandomIdEmptyError],
	["RANDOM_ID_EXPIRED", RandomIdExpiredError],
	["RANDOM_ID_INVALID", RandomIdInvalidError],
	["RANDOM_LENGTH_INVALID", RandomLengthInvalidError],
	["RANGES_INVALID", RangesInvalidError],
	["REACTION_EMPTY", ReactionEmptyError],
	["REACTION_INVALID", ReactionInvalidError],
	["REACTIONS_COUNT_INVALID", ReactionsCountInvalidError],
	["REACTIONS_TOO_MANY", ReactionsTooManyError],
	["RECEIPT_EMPTY", ReceiptEmptyError],
	["REPLY_MARKUP_BUY_EMPTY", ReplyMarkupBuyEmptyError],
	["REPLY_MARKUP_GAME_EMPTY", ReplyMarkupGameEmptyError],
	["REPLY_MARKUP_INVALID", ReplyMarkupInvalidError],
	["REPLY_MARKUP_TOO_LONG", ReplyMarkupTooLongError],
	["REPLY_MESSAGE_ID_INVALID", ReplyMessageIdInvalidError],
	["REPLY_MESSAGES_TOO_MUCH", ReplyMessagesTooMuchError],
	["REPLY_TO_INVALID", ReplyToInvalidError],
	["REPLY_TO_MONOFORUM_PEER_INVALID", ReplyToMonoforumPeerInvalidError],
	["REPLY_TO_USER_INVALID", ReplyToUserInvalidError],
	["REQUEST_MSG_EXPIRED", RequestMsgExpiredError],
	["REQUEST_TOKEN_INVALID", RequestTokenInvalidError],
	["RESELL_STARS_TOO_FEW", ResellStarsTooFewError],
	["RESELL_STARS_TOO_MUCH", ResellStarsTooMuchError],
	["RESET_REQUEST_MISSING", ResetRequestMissingError],
	["RESULT_ID_DUPLICATE", ResultIdDuplicateError],
	["RESULT_ID_EMPTY", ResultIdEmptyError],
	["RESULT_ID_INVALID", ResultIdInvalidError],
	["RESULT_TYPE_INVALID", ResultTypeInvalidError],
	["RESULTS_TOO_MUCH", ResultsTooMuchError],
	["REVOTE_NOT_ALLOWED", RevoteNotAllowedError],
	["RIGHTS_NOT_MODIFIED", RightsNotModifiedError],
	["RINGTONE_INVALID", RingtoneInvalidError],
	["RINGTONE_MIME_INVALID", RingtoneMimeInvalidError],
	["RSA_DECRYPT_FAILED", RsaDecryptFailedError],
	["SAVED_ID_EMPTY", SavedIdEmptyError],
	["SCHEDULE_BOT_NOT_ALLOWED", ScheduleBotNotAllowedError],
	["SCHEDULE_DATE_INVALID", ScheduleDateInvalidError],
	["SCHEDULE_DATE_TOO_LATE", ScheduleDateTooLateError],
	["SCHEDULE_STATUS_PRIVATE", ScheduleStatusPrivateError],
	["SCHEDULE_TOO_MUCH", ScheduleTooMuchError],
	["SCORE_INVALID", ScoreInvalidError],
	["SEARCH_QUERY_EMPTY", SearchQueryEmptyError],
	["SEARCH_WITH_LINK_NOT_SUPPORTED", SearchWithLinkNotSupportedError],
	["SECONDS_INVALID", SecondsInvalidError],
	["SECURE_SECRET_REQUIRED", SecureSecretRequiredError],
	["SELF_DELETE_RESTRICTED", SelfDeleteRestrictedError],
	["SEND_AS_PEER_INVALID", SendAsPeerInvalidError],
	["SEND_MESSAGE_GAME_INVALID", SendMessageGameInvalidError],
	["SEND_MESSAGE_MEDIA_INVALID", SendMessageMediaInvalidError],
	["SEND_MESSAGE_TYPE_INVALID", SendMessageTypeInvalidError],
	["SETTINGS_INVALID", SettingsInvalidError],
	["SHA256_HASH_INVALID", Sha256HashInvalidError],
	["SHORT_NAME_INVALID", ShortNameInvalidError],
	["SHORT_NAME_OCCUPIED", ShortNameOccupiedError],
	["SHORTCUT_INVALID", ShortcutInvalidError],
	["SLOTS_EMPTY", SlotsEmptyError],
	["SLOWMODE_MULTI_MSGS_DISABLED", SlowmodeMultiMsgsDisabledError],
	["SLUG_INVALID", SlugInvalidError],
	["SMS_CODE_CREATE_FAILED", SmsCodeCreateFailedError],
	["SMSJOB_ID_INVALID", SmsjobIdInvalidError],
	["SRP_A_INVALID", SrpAInvalidError],
	["SRP_ID_INVALID", SrpIdInvalidError],
	["SRP_PASSWORD_CHANGED", SrpPasswordChangedError],
	["STARGIFT_ALREADY_CONVERTED", StargiftAlreadyConvertedError],
	["STARGIFT_ALREADY_REFUNDED", StargiftAlreadyRefundedError],
	["STARGIFT_ALREADY_UPGRADED", StargiftAlreadyUpgradedError],
	["STARGIFT_ATTRIBUTE_INVALID", StargiftAttributeInvalidError],
	["STARGIFT_INVALID", StargiftInvalidError],
	["STARGIFT_MESSAGE_INVALID", StargiftMessageInvalidError],
	["STARGIFT_NOT_FOUND", StargiftNotFoundError],
	["STARGIFT_NOT_OWNER", StargiftNotOwnerError],
	["STARGIFT_NOT_UNIQUE", StargiftNotUniqueError],
	["STARGIFT_OBJECT_INVALID", StargiftObjectInvalidError],
	["STARGIFT_OFFER_INVALID", StargiftOfferInvalidError],
	["STARGIFT_OFFER_NOT_ALLOWED", StargiftOfferNotAllowedError],
	["STARGIFT_OWNER_INVALID", StargiftOwnerInvalidError],
	["STARGIFT_PEER_INVALID", StargiftPeerInvalidError],
	["STARGIFT_RESELL_CURRENCY_NOT_ALLOWED", StargiftResellCurrencyNotAllowedError],
	["STARGIFT_SLUG_INVALID", StargiftSlugInvalidError],
	["STARGIFT_UPGRADE_UNAVAILABLE", StargiftUpgradeUnavailableError],
	["STARGIFT_USAGE_LIMITED", StargiftUsageLimitedError],
	["STARGIFT_USER_USAGE_LIMITED", StargiftUserUsageLimitedError],
	["STARREF_AWAITING_END", StarrefAwaitingEndError],
	["STARREF_EXPIRED", StarrefExpiredError],
	["STARREF_HASH_REVOKED", StarrefHashRevokedError],
	["STARREF_PERMILLE_INVALID", StarrefPermilleInvalidError],
	["STARREF_PERMILLE_TOO_LOW", StarrefPermilleTooLowError],
	["STARS_AMOUNT_INVALID", StarsAmountInvalidError],
	["STARS_INVOICE_INVALID", StarsInvoiceInvalidError],
	["STARS_PAYMENT_REQUIRED", StarsPaymentRequiredError],
	["START_PARAM_EMPTY", StartParamEmptyError],
	["START_PARAM_INVALID", StartParamInvalidError],
	["START_PARAM_TOO_LONG", StartParamTooLongError],
	["STICKER_DOCUMENT_INVALID", StickerDocumentInvalidError],
	["STICKER_EMOJI_INVALID", StickerEmojiInvalidError],
	["STICKER_FILE_INVALID", StickerFileInvalidError],
	["STICKER_GIF_DIMENSIONS", StickerGifDimensionsError],
	["STICKER_ID_INVALID", StickerIdInvalidError],
	["STICKER_INVALID", StickerInvalidError],
	["STICKER_MIME_INVALID", StickerMimeInvalidError],
	["STICKER_PNG_DIMENSIONS", StickerPngDimensionsError],
	["STICKER_PNG_NOPNG", StickerPngNopngError],
	["STICKER_TGS_NODOC", StickerTgsNodocError],
	["STICKER_TGS_NOTGS", StickerTgsNotgsError],
	["STICKER_THUMB_PNG_NOPNG", StickerThumbPngNopngError],
	["STICKER_THUMB_TGS_NOTGS", StickerThumbTgsNotgsError],
	["STICKER_VIDEO_BIG", StickerVideoBigError],
	["STICKER_VIDEO_NODOC", StickerVideoNodocError],
	["STICKER_VIDEO_NOWEBM", StickerVideoNowebmError],
	["STICKERPACK_STICKERS_TOO_MUCH", StickerpackStickersTooMuchError],
	["STICKERS_EMPTY", StickersEmptyError],
	["STICKERS_TOO_MUCH", StickersTooMuchError],
	["STICKERSET_INVALID", StickersetInvalidError],
	["STORIES_NEVER_CREATED", StoriesNeverCreatedError],
	["STORIES_TOO_MUCH", StoriesTooMuchError],
	["STORY_ID_EMPTY", StoryIdEmptyError],
	["STORY_ID_INVALID", StoryIdInvalidError],
	["STORY_NOT_MODIFIED", StoryNotModifiedError],
	["STORY_PERIOD_INVALID", StoryPeriodInvalidError],
	["SUBSCRIPTION_EXPORT_MISSING", SubscriptionExportMissingError],
	["SUBSCRIPTION_ID_INVALID", SubscriptionIdInvalidError],
	["SUBSCRIPTION_PERIOD_INVALID", SubscriptionPeriodInvalidError],
	["SUGGESTED_POST_AMOUNT_INVALID", SuggestedPostAmountInvalidError],
	["SUGGESTED_POST_PEER_INVALID", SuggestedPostPeerInvalidError],
	["SWITCH_PM_TEXT_EMPTY", SwitchPmTextEmptyError],
	["SWITCH_WEBVIEW_URL_INVALID", SwitchWebviewUrlInvalidError],
	["TAKEOUT_INVALID", TakeoutInvalidError],
	["TAKEOUT_REQUIRED", TakeoutRequiredError],
	["TASK_ALREADY_EXISTS", TaskAlreadyExistsError],
	["TEMP_AUTH_KEY_ALREADY_BOUND", TempAuthKeyAlreadyBoundError],
	["TEMP_AUTH_KEY_EMPTY", TempAuthKeyEmptyError],
	["TERMS_URL_INVALID", TermsUrlInvalidError],
	["TEXTDRAFT_PEER_INVALID", TextdraftPeerInvalidError],
	["THEME_FILE_INVALID", ThemeFileInvalidError],
	["THEME_FORMAT_INVALID", ThemeFormatInvalidError],
	["THEME_INVALID", ThemeInvalidError],
	["THEME_MIME_INVALID", ThemeMimeInvalidError],
	["THEME_PARAMS_INVALID", ThemeParamsInvalidError],
	["THEME_SLUG_INVALID", ThemeSlugInvalidError],
	["THEME_TITLE_INVALID", ThemeTitleInvalidError],
	["TIMEZONE_INVALID", TimezoneInvalidError],
	["TITLE_INVALID", TitleInvalidError],
	["TMP_PASSWORD_DISABLED", TmpPasswordDisabledError],
	["TMP_PASSWORD_INVALID", TmpPasswordInvalidError],
	["TO_ID_INVALID", ToIdInvalidError],
	["TO_LANG_INVALID", ToLangInvalidError],
	["TODO_ITEM_DUPLICATE", TodoItemDuplicateError],
	["TODO_ITEMS_EMPTY", TodoItemsEmptyError],
	["TODO_ITEMS_TOO_MUCH", TodoItemsTooMuchError],
	["TODO_NOT_MODIFIED", TodoNotModifiedError],
	["TOKEN_EMPTY", TokenEmptyError],
	["TOKEN_INVALID", TokenInvalidError],
	["TOKEN_TYPE_INVALID", TokenTypeInvalidError],
	["TOPIC_CLOSE_SEPARATELY", TopicCloseSeparatelyError],
	["TOPIC_CLOSED", TopicClosedError],
	["TOPIC_DELETED", TopicDeletedError],
	["TOPIC_HIDE_SEPARATELY", TopicHideSeparatelyError],
	["TOPIC_ID_INVALID", TopicIdInvalidError],
	["TOPIC_NOT_MODIFIED", TopicNotModifiedError],
	["TOPIC_TITLE_EMPTY", TopicTitleEmptyError],
	["TOPICS_EMPTY", TopicsEmptyError],
	["TRANSACTION_ID_INVALID", TransactionIdInvalidError],
	["TRANSCRIPTION_FAILED", TranscriptionFailedError],
	["TRANSLATE_REQ_QUOTA_EXCEEDED", TranslateReqQuotaExceededError],
	["TTL_DAYS_INVALID", TtlDaysInvalidError],
	["TTL_MEDIA_INVALID", TtlMediaInvalidError],
	["TTL_PERIOD_INVALID", TtlPeriodInvalidError],
	["TYPES_EMPTY", TypesEmptyError],
	["UNSUPPORTED", UnsupportedError],
	["UNTIL_DATE_INVALID", UntilDateInvalidError],
	["URL_EXPIRED", UrlExpiredError],
	["URL_INVALID", UrlInvalidError],
	["USAGE_LIMIT_INVALID", UsageLimitInvalidError],
	["USER_ADMIN_INVALID", UserAdminInvalidError],
	["USER_ALREADY_INVITED", UserAlreadyInvitedError],
	["USER_ALREADY_PARTICIPANT", UserAlreadyParticipantError],
	["USER_BANNED_IN_CHANNEL", UserBannedInChannelError],
	["USER_BLOCKED", UserBlockedError],
	["USER_BOT", UserBotError],
	["USER_BOT_INVALID", UserBotInvalidError],
	["USER_BOT_REQUIRED", UserBotRequiredError],
	["USER_BOT_TO_BOT_DISABLED", UserBotToBotDisabledError],
	["USER_CHANNELS_TOO_MUCH", UserChannelsTooMuchError],
	["USER_CREATOR", UserCreatorError],
	["USER_GIFT_UNAVAILABLE", UserGiftUnavailableError],
	["USER_ID_INVALID", UserIdInvalidError],
	["USER_INVALID", UserInvalidError],
	["USER_IS_BLOCKED", UserIsBlockedError],
	["USER_IS_BOT", UserIsBotError],
	["USER_KICKED", UserKickedError],
	["USER_NOT_MUTUAL_CONTACT", UserNotMutualContactError],
	["USER_NOT_PARTICIPANT", UserNotParticipantError],
	["USER_PUBLIC_MISSING", UserPublicMissingError],
	["USER_VOLUME_INVALID", UserVolumeInvalidError],
	["USERNAME_INVALID", UsernameInvalidError],
	["USERNAME_NOT_MODIFIED", UsernameNotModifiedError],
	["USERNAME_NOT_OCCUPIED", UsernameNotOccupiedError],
	["USERNAME_OCCUPIED", UsernameOccupiedError],
	["USERNAME_PURCHASE_AVAILABLE", UsernamePurchaseAvailableError],
	["USERNAME_SUFFIX_MISSING", UsernameSuffixMissingError],
	["USERNAMES_ACTIVE_TOO_MUCH", UsernamesActiveTooMuchError],
	["USERPIC_UPLOAD_REQUIRED", UserpicUploadRequiredError],
	["USERS_TOO_FEW", UsersTooFewError],
	["USERS_TOO_MUCH", UsersTooMuchError],
	["VENUE_ID_INVALID", VenueIdInvalidError],
	["VIDEO_CONTENT_TYPE_INVALID", VideoContentTypeInvalidError],
	["VIDEO_DURATION_INVALID", VideoDurationInvalidError],
	["VIDEO_FILE_INVALID", VideoFileInvalidError],
	["VIDEO_PAUSE_FORBIDDEN", VideoPauseForbiddenError],
	["VIDEO_STOP_FORBIDDEN", VideoStopForbiddenError],
	["VIDEO_TITLE_EMPTY", VideoTitleEmptyError],
	["VOICE_MESSAGES_FORBIDDEN", VoiceMessagesForbiddenError],
	["WALLPAPER_FILE_INVALID", WallpaperFileInvalidError],
	["WALLPAPER_INVALID", WallpaperInvalidError],
	["WALLPAPER_MIME_INVALID", WallpaperMimeInvalidError],
	["WALLPAPER_NOT_FOUND", WallpaperNotFoundError],
	["WC_CONVERT_URL_INVALID", WcConvertUrlInvalidError],
	["WEBAPP_REQ_ID_INVALID", WebappReqIdInvalidError],
	["WEBAUTH_TOKEN_EXPIRED", WebauthTokenExpiredError],
	["WEBDOCUMENT_INVALID", WebdocumentInvalidError],
	["WEBDOCUMENT_MIME_INVALID", WebdocumentMimeInvalidError],
	["WEBDOCUMENT_SIZE_TOO_BIG", WebdocumentSizeTooBigError],
	["WEBDOCUMENT_URL_EMPTY", WebdocumentUrlEmptyError],
	["WEBDOCUMENT_URL_INVALID", WebdocumentUrlInvalidError],
	["WEBPAGE_CURL_FAILED", WebpageCurlFailedError],
	["WEBPAGE_MEDIA_EMPTY", WebpageMediaEmptyError],
	["WEBPAGE_NOT_FOUND", WebpageNotFoundError],
	["WEBPAGE_URL_INVALID", WebpageUrlInvalidError],
	["WEBPUSH_AUTH_INVALID", WebpushAuthInvalidError],
	["WEBPUSH_KEY_INVALID", WebpushKeyInvalidError],
	["WEBPUSH_TOKEN_INVALID", WebpushTokenInvalidError],
	["YOU_BLOCKED_USER", YouBlockedUserError],
	["BOT_METHOD_INVALID", BotMethodInvalidError],
	["CONNECTION_DEVICE_MODEL_EMPTY", ConnectionDeviceModelEmptyError],
	["CONNECTION_LANG_PACK_INVALID", ConnectionLangPackInvalidError],
	["CONNECTION_NOT_INITED", ConnectionNotInitedError],
	["CONNECTION_SYSTEM_EMPTY", ConnectionSystemEmptyError],
	["CONNECTION_SYSTEM_LANG_CODE_EMPTY", ConnectionSystemLangCodeEmptyError],
	["INPUT_CONSTRUCTOR_INVALID", InputConstructorInvalidError],
	["INPUT_FETCH_ERROR", InputFetchErrorError],
	["INPUT_FETCH_FAIL", InputFetchFailError],
	["INPUT_LAYER_INVALID", InputLayerInvalidError],
	["INPUT_METHOD_INVALID", InputMethodInvalidError],
	["INPUT_REQUEST_TOO_LONG", InputRequestTooLongError],
	["PEER_FLOOD", PeerFloodError],
	["STICKERSET_NOT_MODIFIED", StickersetNotModifiedError],
	["AUTH_TOKEN_INVALID2", AuthTokenInvalid2Error],
	["BASE_PORT_LOC_INVALID", BasePortLocInvalidError],
	["BOT_COMMANDS_TOO_MUCH", BotCommandsTooMuchError],
	["BOT_MISSING", BotMissingError],
	["BOT_POLLS_DISABLED", BotPollsDisabledError],
	["BROADCAST_CALLS_DISABLED", BroadcastCallsDisabledError],
	["CHANNEL_BANNED", ChannelBannedError],
	["EXPIRE_FORBIDDEN", ExpireForbiddenError],
	["FIELD_NAME_EMPTY", FieldNameEmptyError],
	["FIELD_NAME_INVALID", FieldNameInvalidError],
	["FILE_PART_0_MISSING", FilePart0MissingError],
	["GROUP_CALL_INVALID", GroupCallInvalidError],
	["POLL_UNSUPPORTED", PollUnsupportedError],
	["REFLECTOR_NOT_AVAILABLE", ReflectorNotAvailableError],
	["SHORTNAME_OCCUPY_FAILED", ShortnameOccupyFailedError],
	["TYPE_CONSTRUCTOR_INVALID", TypeConstructorInvalidError],
	["UNKNOWN_ERROR", UnknownErrorError],
	["AUTH_KEY_UNREGISTERED", AuthKeyUnregisteredError],
	["AUTH_KEY_INVALID", AuthKeyInvalidError],
	["AUTH_KEY_PERM_EMPTY", AuthKeyPermEmptyError],
	["SESSION_EXPIRED", SessionExpiredError],
	["SESSION_PASSWORD_NEEDED", SessionPasswordNeededError],
	["SESSION_REVOKED", SessionRevokedError],
	["USER_DEACTIVATED", UserDeactivatedError],
	["USER_DEACTIVATED_BAN", UserDeactivatedBanError],
	["ACTIVE_USER_REQUIRED", ActiveUserRequiredError],
	["ACCESS_DENIED", AccessDeniedError],
	["ALLOW_PAYMENT_REQUIRED", AllowPaymentRequiredError],
	["BOT_ACCESS_FORBIDDEN", BotAccessForbiddenError],
	["BOT_FORUM_CREATE_FORBIDDEN", BotForumCreateForbiddenError],
	["BOT_GUARD_NOT_SUPPORTED", BotGuardNotSupportedError],
	["BOT_VERIFIER_FORBIDDEN", BotVerifierForbiddenError],
	["BROADCAST_FORBIDDEN", BroadcastForbiddenError],
	["CHANNEL_PUBLIC_GROUP_NA", ChannelPublicGroupNaError],
	["CHAT_ACTION_FORBIDDEN", ChatActionForbiddenError],
	["CHAT_ADMIN_INVITE_REQUIRED", ChatAdminInviteRequiredError],
	["CHAT_GUEST_SEND_FORBIDDEN", ChatGuestSendForbiddenError],
	["CHAT_SEND_AUDIOS_FORBIDDEN", ChatSendAudiosForbiddenError],
	["CHAT_SEND_DOCS_FORBIDDEN", ChatSendDocsForbiddenError],
	["CHAT_SEND_GAME_FORBIDDEN", ChatSendGameForbiddenError],
	["CHAT_SEND_GIFS_FORBIDDEN", ChatSendGifsForbiddenError],
	["CHAT_SEND_MEDIA_FORBIDDEN", ChatSendMediaForbiddenError],
	["CHAT_SEND_PHOTOS_FORBIDDEN", ChatSendPhotosForbiddenError],
	["CHAT_SEND_PLAIN_FORBIDDEN", ChatSendPlainForbiddenError],
	["CHAT_SEND_POLL_FORBIDDEN", ChatSendPollForbiddenError],
	["CHAT_SEND_ROUNDVIDEOS_FORBIDDEN", ChatSendRoundvideosForbiddenError],
	["CHAT_SEND_STICKERS_FORBIDDEN", ChatSendStickersForbiddenError],
	["CHAT_SEND_VIDEOS_FORBIDDEN", ChatSendVideosForbiddenError],
	["CHAT_SEND_VOICES_FORBIDDEN", ChatSendVoicesForbiddenError],
	["CHAT_SEND_WEBPAGE_FORBIDDEN", ChatSendWebpageForbiddenError],
	["CHAT_TYPE_INVALID", ChatTypeInvalidError],
	["EDIT_BOT_INVITE_FORBIDDEN", EditBotInviteForbiddenError],
	["GROUPCALL_ALREADY_STARTED", GroupcallAlreadyStartedError],
	["GROUPCALL_CHANGE_FORBIDDEN", GroupcallChangeForbiddenError],
	["INLINE_BOT_REQUIRED", InlineBotRequiredError],
	["MESSAGE_AUTHOR_REQUIRED", MessageAuthorRequiredError],
	["MESSAGE_DELETE_FORBIDDEN", MessageDeleteForbiddenError],
	["POLL_VOTE_REQUIRED", PollVoteRequiredError],
	["PRIVACY_PREMIUM_REQUIRED", PrivacyPremiumRequiredError],
	["PUBLIC_CHANNEL_MISSING", PublicChannelMissingError],
	["RIGHT_FORBIDDEN", RightForbiddenError],
	["SENSITIVE_CHANGE_FORBIDDEN", SensitiveChangeForbiddenError],
	["USER_DELETED", UserDeletedError],
	["USER_DISALLOWED_STARGIFTS", UserDisallowedStargiftsError],
	["USER_PERMISSION_DENIED", UserPermissionDeniedError],
	["USER_PRIVACY_RESTRICTED", UserPrivacyRestrictedError],
	["USER_RESTRICTED", UserRestrictedError],
	["YOUR_PRIVACY_RESTRICTED", YourPrivacyRestrictedError],
	["CHAT_FORBIDDEN", ChatForbiddenError],
	["NOT_ALLOWED", NotAllowedError],
	["API_GIFT_RESTRICTED_UPDATE_APP", ApiGiftRestrictedUpdateAppError],
	["BUSINESS_ADDRESS_ACTIVE", BusinessAddressActiveError],
	["CALL_PROTOCOL_COMPAT_LAYER_INVALID", CallProtocolCompatLayerInvalidError],
	["EDIT_MESSAGE_TEMP_RESTRICTED", EditMessageTempRestrictedError],
	["FILEREF_UPGRADE_NEEDED", FilerefUpgradeNeededError],
	["FRESH_CHANGE_PHONE_FORBIDDEN", FreshChangePhoneForbiddenError],
	["FRESH_RESET_AUTHORISATION_FORBIDDEN", FreshResetAuthorisationForbiddenError],
	["PAYMENT_UNSUPPORTED", PaymentUnsupportedError],
	["PHONE_PASSWORD_FLOOD", PhonePasswordFloodError],
	["POLL_COUNTRY_RESTRICTED", PollCountryRestrictedError],
	["POLL_MEMBER_RESTRICTED", PollMemberRestrictedError],
	["PRECHECKOUT_FAILED", PrecheckoutFailedError],
	["PREMIUM_CURRENTLY_UNAVAILABLE", PremiumCurrentlyUnavailableError],
	["SEND_CODE_UNAVAILABLE", SendCodeUnavailableError],
	["STARGIFT_EXPORT_IN_PROGRESS", StargiftExportInProgressError],
	["STARS_FORM_AMOUNT_MISMATCH", StarsFormAmountMismatchError],
	["STICKERSET_OWNER_ANONYMOUS", StickersetOwnerAnonymousError],
	["TRANSLATIONS_DISABLED", TranslationsDisabledError],
	["UPDATE_APP_TO_LOGIN", UpdateAppToLoginError],
	["USERPIC_PRIVACY_REQUIRED", UserpicPrivacyRequiredError],
	["AUTH_KEY_DUPLICATED", AuthKeyDuplicatedError],
	["PREVIOUS_CHAT_IMPORT_ACTIVE_WAIT_XMIN", PreviousChatImportActiveWaitXminError],
	["FROZEN_METHOD_INVALID", FrozenMethodInvalidError],
	["AICOMPOSE_TIMEOUT", AicomposeTimeoutError],
	["AUTH_KEY_UNSYNCHRONIZED", AuthKeyUnsynchronizedError],
	["AUTH_RESTART", AuthRestartError],
	["CDN_UPLOAD_TIMEOUT", CdnUploadTimeoutError],
	["CHAT_ID_GENERATE_FAILED", ChatIdGenerateFailedError],
	["OAUTH_REQUEST_INVALID", OauthRequestInvalidError],
	["PERSISTENT_TIMESTAMP_OUTDATED", PersistentTimestampOutdatedError],
	["SEND_MEDIA_INVALID", SendMediaInvalidError],
	["SIGN_IN_FAILED", SignInFailedError],
	["TRANSLATE_REQ_FAILED", TranslateReqFailedError],
	["TRANSLATION_TIMEOUT", TranslationTimeoutError],
	["CHAT_GET_FAILED", ChatGetFailedError],
	["CHP_CALL_FAIL", ChpCallFailError],
	["ENCRYPTION_OCCUPY_FAILED", EncryptionOccupyFailedError],
	["GROUPCALL_ADD_PARTICIPANTS_FAILED", GroupcallAddParticipantsFailedError],
	["HISTORY_GET_FAILED", HistoryGetFailedError],
	["MEMBER_NO_LOCATION", MemberNoLocationError],
	["MEMBER_OCCUPY_PRIMARY_LOC_FAILED", MemberOccupyPrimaryLocFailedError],
	["MSGID_DECREASE_RETRY", MsgidDecreaseRetryError],
	["MT_SEND_QUEUE_TOO_LONG", MtSendQueueTooLongError],
	["NEED_CHAT_INVALID", NeedChatInvalidError],
	["NEED_MEMBER_INVALID", NeedMemberInvalidError],
	["PARTICIPANT_CALL_FAILED", ParticipantCallFailedError],
	["POSTPONED_TIMEOUT", PostponedTimeoutError],
	["PTS_CHANGE_EMPTY", PtsChangeEmptyError],
	["REG_ID_GENERATE_FAILED", RegIdGenerateFailedError],
	["RPC_CALL_FAIL", RpcCallFailError],
	["RPC_MCGET_FAIL", RpcMcgetFailError],
	["STORAGE_CHECK_FAILED", StorageCheckFailedError],
	["STORE_INVALID_SCALAR_TYPE", StoreInvalidScalarTypeError],
	["UNKNOWN_METHOD", UnknownMethodError],
	["WORKER_BUSY_TOO_LONG_RETRY", WorkerBusyTooLongRetryError],
	["Timeout", TimeoutError],
	["MSG_WAIT_TIMEOUT", MsgWaitTimeoutError],
	["ANONYMOUS_REACTIONS_DISABLED", AnonymousReactionsDisabledError]
]);
const rpcErrorsRe = /* @__PURE__ */ new Map([
	[/^NETWORK_MIGRATE_(\d+)$/, NetworkMigrateError],
	[/^PHONE_MIGRATE_(\d+)$/, PhoneMigrateError],
	[/^STATS_MIGRATE_(\d+)$/, StatsMigrateError],
	[/^USER_MIGRATE_(\d+)$/, UserMigrateError],
	[/^EMAIL_UNCONFIRMED_(\d+)$/, EmailUnconfirmedError],
	[/^FILE_REFERENCE_(\d+)_EMPTY$/, FileReferenceEmptyError],
	[/^FILE_REFERENCE_(\d+)_EXPIRED$/, FileReferenceExpiredError],
	[/^FILE_REFERENCE_(\d+)_INVALID$/, FileReferenceInvalidError],
	[/^PASSWORD_TOO_FRESH_(\d+)$/, PasswordTooFreshError],
	[/^SESSION_TOO_FRESH_(\d+)$/, SessionTooFreshError],
	[/^STARGIFT_RESELL_TOO_EARLY_(\d+)$/, StargiftResellTooEarlyError],
	[/^STARGIFT_TRANSFER_TOO_EARLY_(\d+)$/, StargiftTransferTooEarlyError],
	[/^STORY_LIVE_ALREADY_(\d+)$/, StoryLiveAlreadyError],
	[/^STORY_SEND_FLOOD_MONTHLY_(\d+)$/, StorySendFloodMonthlyError],
	[/^STORY_SEND_FLOOD_WEEKLY_(\d+)$/, StorySendFloodWeeklyError],
	[/^FILE_MIGRATE_(\d+)$/, FileMigrateError],
	[/^FILE_PART_(\d+)_MISSING$/, FilePartMissingError],
	[/^ALLOW_PAYMENT_REQUIRED_(\d+)$/, AllowPaymentRequiredError],
	[/^PREVIOUS_CHAT_IMPORT_ACTIVE_WAIT_(\d+)MIN$/, PreviousChatImportActiveWaitMinError],
	[/^2FA_CONFIRM_WAIT_(\d+)$/, TwoFaConfirmWaitError],
	[/^FLOOD_PREMIUM_WAIT_(\d+)$/, FloodWaitError],
	[/^FLOOD_WAIT_(\d+)$/, FloodWaitError],
	[/^PREMIUM_SUB_ACTIVE_UNTIL_(\d+)$/, PremiumSubActiveUntilError],
	[/^SLOWMODE_WAIT_(\d+)$/, SlowModeWaitError],
	[/^TAKEOUT_INIT_DELAY_(\d+)$/, TakeoutInitDelayError],
	[/^AUTH_RESTART_(\d+)$/, AuthRestartError],
	[/^INTERDC_(\d+)_CALL_ERROR$/, InterdcCallErrorError],
	[/^INTERDC_(\d+)_CALL_RICH_ERROR$/, InterdcCallRichErrorError],
	[/^FLOOD_TEST_PHONE_WAIT_(\d+)$/, FloodTestPhoneWaitError]
]);
const rpcErrorRe = rpcErrorsRe;
const baseErrors = /* @__PURE__ */ new Map([
	[303, require_errors_RPCBaseErrors.InvalidDCError],
	[400, require_errors_RPCBaseErrors.BadRequestError],
	[401, require_errors_RPCBaseErrors.UnauthorizedError],
	[403, require_errors_RPCBaseErrors.ForbiddenError],
	[404, require_errors_RPCBaseErrors.NotFoundError],
	[406, require_errors_RPCBaseErrors.AuthKeyError],
	[420, require_errors_RPCBaseErrors.FloodError],
	[500, require_errors_RPCBaseErrors.ServerError],
	[503, require_errors_RPCBaseErrors.TimedOutError]
]);
exports.AboutTooLongError = AboutTooLongError;
exports.AccessDeniedError = AccessDeniedError;
exports.AccessTokenExpiredError = AccessTokenExpiredError;
exports.AccessTokenInvalidError = AccessTokenInvalidError;
exports.ActiveUserRequiredError = ActiveUserRequiredError;
exports.AdExpiredError = AdExpiredError;
exports.AddressInvalidError = AddressInvalidError;
exports.AdminIdInvalidError = AdminIdInvalidError;
exports.AdminRankEmojiNotAllowedError = AdminRankEmojiNotAllowedError;
exports.AdminRankInvalidError = AdminRankInvalidError;
exports.AdminRightsEmptyError = AdminRightsEmptyError;
exports.AdminsTooMuchError = AdminsTooMuchError;
exports.AiComposeTaskMissingError = AiComposeTaskMissingError;
exports.AicomposeFloodPremiumError = AicomposeFloodPremiumError;
exports.AicomposeTimeoutError = AicomposeTimeoutError;
exports.AicomposeToneInvalidError = AicomposeToneInvalidError;
exports.AicomposeToneTitleInvalidError = AicomposeToneTitleInvalidError;
exports.AlbumPhotosTooManyError = AlbumPhotosTooManyError;
exports.AllowPaymentRequiredError = AllowPaymentRequiredError;
exports.AnonymousReactionsDisabledError = AnonymousReactionsDisabledError;
exports.ApiGiftRestrictedUpdateAppError = ApiGiftRestrictedUpdateAppError;
exports.ApiIdInvalidError = ApiIdInvalidError;
exports.ApiIdPublishedFloodError = ApiIdPublishedFloodError;
exports.ArticleTitleEmptyError = ArticleTitleEmptyError;
exports.AudioContentUrlEmptyError = AudioContentUrlEmptyError;
exports.AudioTitleEmptyError = AudioTitleEmptyError;
exports.AuthBytesInvalidError = AuthBytesInvalidError;
exports.AuthKeyDuplicatedError = AuthKeyDuplicatedError;
exports.AuthKeyInvalidError = AuthKeyInvalidError;
exports.AuthKeyPermEmptyError = AuthKeyPermEmptyError;
exports.AuthKeyUnregisteredError = AuthKeyUnregisteredError;
exports.AuthKeyUnsynchronizedError = AuthKeyUnsynchronizedError;
exports.AuthRestartError = AuthRestartError;
exports.AuthTokenAlreadyAcceptedError = AuthTokenAlreadyAcceptedError;
exports.AuthTokenExceptionError = AuthTokenExceptionError;
exports.AuthTokenExpiredError = AuthTokenExpiredError;
exports.AuthTokenInvalid2Error = AuthTokenInvalid2Error;
exports.AuthTokenInvalidError = AuthTokenInvalidError;
exports.AuthTokenInvalidxError = AuthTokenInvalidxError;
exports.AutoarchiveNotAvailableError = AutoarchiveNotAvailableError;
exports.BalanceTooLowError = BalanceTooLowError;
exports.BankCardNumberInvalidError = BankCardNumberInvalidError;
exports.BannedRightsInvalidError = BannedRightsInvalidError;
exports.BasePortLocInvalidError = BasePortLocInvalidError;
exports.BirthdayAlreadyError = BirthdayAlreadyError;
exports.BirthdayInvalidError = BirthdayInvalidError;
exports.BoostNotModifiedError = BoostNotModifiedError;
exports.BoostPeerInvalidError = BoostPeerInvalidError;
exports.BoostsEmptyError = BoostsEmptyError;
exports.BoostsRequiredError = BoostsRequiredError;
exports.BotAccessForbiddenError = BotAccessForbiddenError;
exports.BotAlreadyDisabledError = BotAlreadyDisabledError;
exports.BotAppBotInvalidError = BotAppBotInvalidError;
exports.BotAppInvalidError = BotAppInvalidError;
exports.BotAppShortnameInvalidError = BotAppShortnameInvalidError;
exports.BotBusinessMissingError = BotBusinessMissingError;
exports.BotChannelsNaError = BotChannelsNaError;
exports.BotCommandDescriptionInvalidError = BotCommandDescriptionInvalidError;
exports.BotCommandInvalidError = BotCommandInvalidError;
exports.BotCommandsTooMuchError = BotCommandsTooMuchError;
exports.BotCreateLimitExceededError = BotCreateLimitExceededError;
exports.BotDomainInvalidError = BotDomainInvalidError;
exports.BotFallbackUnsupportedError = BotFallbackUnsupportedError;
exports.BotForumCreateForbiddenError = BotForumCreateForbiddenError;
exports.BotGamesDisabledError = BotGamesDisabledError;
exports.BotGroupsBlockedError = BotGroupsBlockedError;
exports.BotGuardNotSupportedError = BotGuardNotSupportedError;
exports.BotIdInvalidError = BotIdInvalidError;
exports.BotInlineDisabledError = BotInlineDisabledError;
exports.BotInvalidError = BotInvalidError;
exports.BotInvoiceInvalidError = BotInvoiceInvalidError;
exports.BotMethodInvalidError = BotMethodInvalidError;
exports.BotMissingError = BotMissingError;
exports.BotNotConnectedYetError = BotNotConnectedYetError;
exports.BotOnesideNotAvailError = BotOnesideNotAvailError;
exports.BotPaymentsDisabledError = BotPaymentsDisabledError;
exports.BotPollsDisabledError = BotPollsDisabledError;
exports.BotResponseTimeoutError = BotResponseTimeoutError;
exports.BotScoreNotModifiedError = BotScoreNotModifiedError;
exports.BotVerifierForbiddenError = BotVerifierForbiddenError;
exports.BotWebviewDisabledError = BotWebviewDisabledError;
exports.BotsTooMuchError = BotsTooMuchError;
exports.BroadcastCallsDisabledError = BroadcastCallsDisabledError;
exports.BroadcastForbiddenError = BroadcastForbiddenError;
exports.BroadcastIdInvalidError = BroadcastIdInvalidError;
exports.BroadcastPublicVotersForbiddenError = BroadcastPublicVotersForbiddenError;
exports.BroadcastRequiredError = BroadcastRequiredError;
exports.BusinessAddressActiveError = BusinessAddressActiveError;
exports.BusinessConnectionInvalidError = BusinessConnectionInvalidError;
exports.BusinessConnectionNotAllowedError = BusinessConnectionNotAllowedError;
exports.BusinessPeerInvalidError = BusinessPeerInvalidError;
exports.BusinessPeerUsageMissingError = BusinessPeerUsageMissingError;
exports.BusinessRecipientsEmptyError = BusinessRecipientsEmptyError;
exports.BusinessWorkHoursEmptyError = BusinessWorkHoursEmptyError;
exports.BusinessWorkHoursPeriodInvalidError = BusinessWorkHoursPeriodInvalidError;
exports.ButtonCopyTextInvalidError = ButtonCopyTextInvalidError;
exports.ButtonDataInvalidError = ButtonDataInvalidError;
exports.ButtonIdInvalidError = ButtonIdInvalidError;
exports.ButtonInvalidError = ButtonInvalidError;
exports.ButtonPosInvalidError = ButtonPosInvalidError;
exports.ButtonTextInvalidError = ButtonTextInvalidError;
exports.ButtonTypeInvalidError = ButtonTypeInvalidError;
exports.ButtonUrlInvalidError = ButtonUrlInvalidError;
exports.ButtonUserInvalidError = ButtonUserInvalidError;
exports.ButtonUserPrivacyRestrictedError = ButtonUserPrivacyRestrictedError;
exports.CallAlreadyAcceptedError = CallAlreadyAcceptedError;
exports.CallAlreadyDeclinedError = CallAlreadyDeclinedError;
exports.CallNotActiveError = CallNotActiveError;
exports.CallOccupyFailedError = CallOccupyFailedError;
exports.CallPeerInvalidError = CallPeerInvalidError;
exports.CallProtocolCompatLayerInvalidError = CallProtocolCompatLayerInvalidError;
exports.CallProtocolFlagsInvalidError = CallProtocolFlagsInvalidError;
exports.CallProtocolLayerInvalidError = CallProtocolLayerInvalidError;
exports.CdnMethodInvalidError = CdnMethodInvalidError;
exports.CdnUploadTimeoutError = CdnUploadTimeoutError;
exports.ChannelBannedError = ChannelBannedError;
exports.ChannelForumMissingError = ChannelForumMissingError;
exports.ChannelIdInvalidError = ChannelIdInvalidError;
exports.ChannelInvalidError = ChannelInvalidError;
exports.ChannelMonoforumUnsupportedError = ChannelMonoforumUnsupportedError;
exports.ChannelParicipantMissingError = ChannelParicipantMissingError;
exports.ChannelPrivateError = ChannelPrivateError;
exports.ChannelPublicGroupNaError = ChannelPublicGroupNaError;
exports.ChannelTooBigError = ChannelTooBigError;
exports.ChannelTooLargeError = ChannelTooLargeError;
exports.ChannelsAdminLocatedTooMuchError = ChannelsAdminLocatedTooMuchError;
exports.ChannelsAdminPublicTooMuchError = ChannelsAdminPublicTooMuchError;
exports.ChannelsTooMuchError = ChannelsTooMuchError;
exports.ChargeAlreadyRefundedError = ChargeAlreadyRefundedError;
exports.ChargeIdEmptyError = ChargeIdEmptyError;
exports.ChargeIdInvalidError = ChargeIdInvalidError;
exports.ChatAboutNotModifiedError = ChatAboutNotModifiedError;
exports.ChatAboutTooLongError = ChatAboutTooLongError;
exports.ChatActionForbiddenError = ChatActionForbiddenError;
exports.ChatAdminInviteRequiredError = ChatAdminInviteRequiredError;
exports.ChatAdminRequiredError = ChatAdminRequiredError;
exports.ChatDiscussionUnallowedError = ChatDiscussionUnallowedError;
exports.ChatForbiddenError = ChatForbiddenError;
exports.ChatForwardsRestrictedError = ChatForwardsRestrictedError;
exports.ChatGetFailedError = ChatGetFailedError;
exports.ChatGuestSendForbiddenError = ChatGuestSendForbiddenError;
exports.ChatIdEmptyError = ChatIdEmptyError;
exports.ChatIdGenerateFailedError = ChatIdGenerateFailedError;
exports.ChatIdInvalidError = ChatIdInvalidError;
exports.ChatInvalidError = ChatInvalidError;
exports.ChatInvitePermanentError = ChatInvitePermanentError;
exports.ChatLinkExistsError = ChatLinkExistsError;
exports.ChatMemberAddFailedError = ChatMemberAddFailedError;
exports.ChatNotModifiedError = ChatNotModifiedError;
exports.ChatPublicRequiredError = ChatPublicRequiredError;
exports.ChatRestrictedError = ChatRestrictedError;
exports.ChatRevokeDateUnsupportedError = ChatRevokeDateUnsupportedError;
exports.ChatSendAudiosForbiddenError = ChatSendAudiosForbiddenError;
exports.ChatSendDocsForbiddenError = ChatSendDocsForbiddenError;
exports.ChatSendGameForbiddenError = ChatSendGameForbiddenError;
exports.ChatSendGifsForbiddenError = ChatSendGifsForbiddenError;
exports.ChatSendInlineForbiddenError = ChatSendInlineForbiddenError;
exports.ChatSendMediaForbiddenError = ChatSendMediaForbiddenError;
exports.ChatSendPhotosForbiddenError = ChatSendPhotosForbiddenError;
exports.ChatSendPlainForbiddenError = ChatSendPlainForbiddenError;
exports.ChatSendPollForbiddenError = ChatSendPollForbiddenError;
exports.ChatSendRoundvideosForbiddenError = ChatSendRoundvideosForbiddenError;
exports.ChatSendStickersForbiddenError = ChatSendStickersForbiddenError;
exports.ChatSendVideosForbiddenError = ChatSendVideosForbiddenError;
exports.ChatSendVoicesForbiddenError = ChatSendVoicesForbiddenError;
exports.ChatSendWebpageForbiddenError = ChatSendWebpageForbiddenError;
exports.ChatTitleEmptyError = ChatTitleEmptyError;
exports.ChatTooBigError = ChatTooBigError;
exports.ChatTypeInvalidError = ChatTypeInvalidError;
exports.ChatWriteForbiddenError = ChatWriteForbiddenError;
exports.ChatlinkSlugEmptyError = ChatlinkSlugEmptyError;
exports.ChatlinkSlugExpiredError = ChatlinkSlugExpiredError;
exports.ChatlinksTooMuchError = ChatlinksTooMuchError;
exports.ChatlistExcludeInvalidError = ChatlistExcludeInvalidError;
exports.ChatlistsTooMuchError = ChatlistsTooMuchError;
exports.ChpCallFailError = ChpCallFailError;
exports.CodeEmptyError = CodeEmptyError;
exports.CodeHashInvalidError = CodeHashInvalidError;
exports.CodeInvalidError = CodeInvalidError;
exports.CollectibleInvalidError = CollectibleInvalidError;
exports.CollectibleNotFoundError = CollectibleNotFoundError;
exports.CollectionIdInvalidError = CollectionIdInvalidError;
exports.ColorInvalidError = ColorInvalidError;
exports.ConnectionApiIdInvalidError = ConnectionApiIdInvalidError;
exports.ConnectionAppVersionEmptyError = ConnectionAppVersionEmptyError;
exports.ConnectionDeviceModelEmptyError = ConnectionDeviceModelEmptyError;
exports.ConnectionIdInvalidError = ConnectionIdInvalidError;
exports.ConnectionLangPackInvalidError = ConnectionLangPackInvalidError;
exports.ConnectionLayerInvalidError = ConnectionLayerInvalidError;
exports.ConnectionNotInitedError = ConnectionNotInitedError;
exports.ConnectionSystemEmptyError = ConnectionSystemEmptyError;
exports.ConnectionSystemLangCodeEmptyError = ConnectionSystemLangCodeEmptyError;
exports.ContactAddMissingError = ContactAddMissingError;
exports.ContactIdInvalidError = ContactIdInvalidError;
exports.ContactMissingError = ContactMissingError;
exports.ContactNameEmptyError = ContactNameEmptyError;
exports.ContactReqMissingError = ContactReqMissingError;
exports.CreateCallFailedError = CreateCallFailedError;
exports.CredentialInvalidError = CredentialInvalidError;
exports.CurrencyTotalAmountInvalidError = CurrencyTotalAmountInvalidError;
exports.CustomReactionsTooManyError = CustomReactionsTooManyError;
exports.DataHashSizeInvalidError = DataHashSizeInvalidError;
exports.DataInvalidError = DataInvalidError;
exports.DataJsonInvalidError = DataJsonInvalidError;
exports.DataTooLongError = DataTooLongError;
exports.DateEmptyError = DateEmptyError;
exports.DcIdInvalidError = DcIdInvalidError;
exports.DhGAInvalidError = DhGAInvalidError;
exports.DocumentInvalidError = DocumentInvalidError;
exports.EditBotInviteForbiddenError = EditBotInviteForbiddenError;
exports.EditMessageTempRestrictedError = EditMessageTempRestrictedError;
exports.EffectChatInvalidError = EffectChatInvalidError;
exports.EffectIdInvalidError = EffectIdInvalidError;
exports.EmailHashExpiredError = EmailHashExpiredError;
exports.EmailInstallMissingError = EmailInstallMissingError;
exports.EmailInvalidError = EmailInvalidError;
exports.EmailNotAllowedError = EmailNotAllowedError;
exports.EmailNotSetupError = EmailNotSetupError;
exports.EmailUnconfirmedError = EmailUnconfirmedError;
exports.EmailVerifyExpiredError = EmailVerifyExpiredError;
exports.EmojiInvalidError = EmojiInvalidError;
exports.EmojiMarkupInvalidError = EmojiMarkupInvalidError;
exports.EmojiNotModifiedError = EmojiNotModifiedError;
exports.EmoticonEmptyError = EmoticonEmptyError;
exports.EmoticonInvalidError = EmoticonInvalidError;
exports.EmoticonStickerpackMissingError = EmoticonStickerpackMissingError;
exports.EncryptedMessageInvalidError = EncryptedMessageInvalidError;
exports.EncryptionAlreadyAcceptedError = EncryptionAlreadyAcceptedError;
exports.EncryptionAlreadyDeclinedError = EncryptionAlreadyDeclinedError;
exports.EncryptionDeclinedError = EncryptionDeclinedError;
exports.EncryptionIdInvalidError = EncryptionIdInvalidError;
exports.EncryptionOccupyFailedError = EncryptionOccupyFailedError;
exports.EntitiesTooLongError = EntitiesTooLongError;
exports.EntityBoundsInvalidError = EntityBoundsInvalidError;
exports.EntityDateFormatInvalidError = EntityDateFormatInvalidError;
exports.EntityDateInvalidError = EntityDateInvalidError;
exports.EntityDateTooLongError = EntityDateTooLongError;
exports.EntityMentionUserInvalidError = EntityMentionUserInvalidError;
exports.ErrorTextEmptyError = ErrorTextEmptyError;
exports.ExpireDateInvalidError = ExpireDateInvalidError;
exports.ExpireForbiddenError = ExpireForbiddenError;
exports.ExpiresAtInvalidError = ExpiresAtInvalidError;
exports.ExportCardInvalidError = ExportCardInvalidError;
exports.ExtendedMediaAmountInvalidError = ExtendedMediaAmountInvalidError;
exports.ExtendedMediaEmptyError = ExtendedMediaEmptyError;
exports.ExtendedMediaInvalidError = ExtendedMediaInvalidError;
exports.ExtendedMediaPeerInvalidError = ExtendedMediaPeerInvalidError;
exports.ExternalUrlInvalidError = ExternalUrlInvalidError;
exports.FieldNameEmptyError = FieldNameEmptyError;
exports.FieldNameInvalidError = FieldNameInvalidError;
exports.FileContentTypeInvalidError = FileContentTypeInvalidError;
exports.FileEmtpyError = FileEmtpyError;
exports.FileIdInvalidError = FileIdInvalidError;
exports.FileMigrateError = FileMigrateError;
exports.FilePart0MissingError = FilePart0MissingError;
exports.FilePartEmptyError = FilePartEmptyError;
exports.FilePartInvalidError = FilePartInvalidError;
exports.FilePartLengthInvalidError = FilePartLengthInvalidError;
exports.FilePartMissingError = FilePartMissingError;
exports.FilePartSizeChangedError = FilePartSizeChangedError;
exports.FilePartSizeInvalidError = FilePartSizeInvalidError;
exports.FilePartTooBigError = FilePartTooBigError;
exports.FilePartTooSmallError = FilePartTooSmallError;
exports.FilePartsInvalidError = FilePartsInvalidError;
exports.FileReferenceEmptyError = FileReferenceEmptyError;
exports.FileReferenceExpiredError = FileReferenceExpiredError;
exports.FileReferenceInvalidError = FileReferenceInvalidError;
exports.FileTitleEmptyError = FileTitleEmptyError;
exports.FileTokenInvalidError = FileTokenInvalidError;
exports.FilerefUpgradeNeededError = FilerefUpgradeNeededError;
exports.FilterIdInvalidError = FilterIdInvalidError;
exports.FilterIncludeEmptyError = FilterIncludeEmptyError;
exports.FilterNotSupportedError = FilterNotSupportedError;
exports.FilterTitleEmptyError = FilterTitleEmptyError;
exports.FirstnameInvalidError = FirstnameInvalidError;
exports.FloodTestPhoneWaitError = FloodTestPhoneWaitError;
exports.FloodWaitError = FloodWaitError;
exports.FolderIdEmptyError = FolderIdEmptyError;
exports.FolderIdInvalidError = FolderIdInvalidError;
exports.FormExpiredError = FormExpiredError;
exports.FormIdEmptyError = FormIdEmptyError;
exports.FormSubmitDuplicateError = FormSubmitDuplicateError;
exports.FormUnsupportedError = FormUnsupportedError;
exports.ForumEnabledError = ForumEnabledError;
exports.FreshChangeAdminsForbiddenError = FreshChangeAdminsForbiddenError;
exports.FreshChangePhoneForbiddenError = FreshChangePhoneForbiddenError;
exports.FreshResetAuthorisationForbiddenError = FreshResetAuthorisationForbiddenError;
exports.FromMessageBotDisabledError = FromMessageBotDisabledError;
exports.FromPeerInvalidError = FromPeerInvalidError;
exports.FrozenMethodInvalidError = FrozenMethodInvalidError;
exports.FrozenParticipantMissingError = FrozenParticipantMissingError;
exports.GameBotInvalidError = GameBotInvalidError;
exports.GeneralModifyIconForbiddenError = GeneralModifyIconForbiddenError;
exports.GeoPointInvalidError = GeoPointInvalidError;
exports.GifContentTypeInvalidError = GifContentTypeInvalidError;
exports.GifIdInvalidError = GifIdInvalidError;
exports.GiftMonthsInvalidError = GiftMonthsInvalidError;
exports.GiftSlugExpiredError = GiftSlugExpiredError;
exports.GiftSlugInvalidError = GiftSlugInvalidError;
exports.GiftStarsInvalidError = GiftStarsInvalidError;
exports.GraphExpiredReloadError = GraphExpiredReloadError;
exports.GraphInvalidReloadError = GraphInvalidReloadError;
exports.GraphOutdatedReloadError = GraphOutdatedReloadError;
exports.GroupCallInvalidError = GroupCallInvalidError;
exports.GroupcallAddParticipantsFailedError = GroupcallAddParticipantsFailedError;
exports.GroupcallAlreadyDiscardedError = GroupcallAlreadyDiscardedError;
exports.GroupcallAlreadyStartedError = GroupcallAlreadyStartedError;
exports.GroupcallChangeForbiddenError = GroupcallChangeForbiddenError;
exports.GroupcallForbiddenError = GroupcallForbiddenError;
exports.GroupcallInvalidError = GroupcallInvalidError;
exports.GroupcallJoinMissingError = GroupcallJoinMissingError;
exports.GroupcallNotModifiedError = GroupcallNotModifiedError;
exports.GroupcallSsrcDuplicateMuchError = GroupcallSsrcDuplicateMuchError;
exports.GroupedMediaInvalidError = GroupedMediaInvalidError;
exports.HashInvalidError = HashInvalidError;
exports.HashSizeInvalidError = HashSizeInvalidError;
exports.HashtagInvalidError = HashtagInvalidError;
exports.HideRequesterMissingError = HideRequesterMissingError;
exports.HistoryGetFailedError = HistoryGetFailedError;
exports.IdExpiredError = IdExpiredError;
exports.IdInvalidError = IdInvalidError;
exports.ImageProcessFailedError = ImageProcessFailedError;
exports.ImportFileInvalidError = ImportFileInvalidError;
exports.ImportFormatDateInvalidError = ImportFormatDateInvalidError;
exports.ImportFormatUnrecognizedError = ImportFormatUnrecognizedError;
exports.ImportIdInvalidError = ImportIdInvalidError;
exports.ImportTokenInvalidError = ImportTokenInvalidError;
exports.InlineBotRequiredError = InlineBotRequiredError;
exports.InlineResultExpiredError = InlineResultExpiredError;
exports.InputChatlistInvalidError = InputChatlistInvalidError;
exports.InputConstructorInvalidError = InputConstructorInvalidError;
exports.InputFetchErrorError = InputFetchErrorError;
exports.InputFetchFailError = InputFetchFailError;
exports.InputFileInvalidError = InputFileInvalidError;
exports.InputFilterInvalidError = InputFilterInvalidError;
exports.InputLayerInvalidError = InputLayerInvalidError;
exports.InputMethodInvalidError = InputMethodInvalidError;
exports.InputPeersEmptyError = InputPeersEmptyError;
exports.InputPurposeInvalidError = InputPurposeInvalidError;
exports.InputRequestTooLongError = InputRequestTooLongError;
exports.InputStarsAmountInvalidError = InputStarsAmountInvalidError;
exports.InputStarsNanosInvalidError = InputStarsNanosInvalidError;
exports.InputTextEmptyError = InputTextEmptyError;
exports.InputTextTooLongError = InputTextTooLongError;
exports.InputUserDeactivatedError = InputUserDeactivatedError;
exports.InterdcCallErrorError = InterdcCallErrorError;
exports.InterdcCallRichErrorError = InterdcCallRichErrorError;
exports.InviteForbiddenWithJoinasError = InviteForbiddenWithJoinasError;
exports.InviteHashEmptyError = InviteHashEmptyError;
exports.InviteHashExpiredError = InviteHashExpiredError;
exports.InviteHashInvalidError = InviteHashInvalidError;
exports.InviteRequestSentError = InviteRequestSentError;
exports.InviteRevokedMissingError = InviteRevokedMissingError;
exports.InviteSlugEmptyError = InviteSlugEmptyError;
exports.InviteSlugExpiredError = InviteSlugExpiredError;
exports.InviteSlugInvalidError = InviteSlugInvalidError;
exports.InvitesTooMuchError = InvitesTooMuchError;
exports.InvoiceInvalidError = InvoiceInvalidError;
exports.InvoicePayloadInvalidError = InvoicePayloadInvalidError;
exports.JoinAsPeerInvalidError = JoinAsPeerInvalidError;
exports.LangCodeInvalidError = LangCodeInvalidError;
exports.LangCodeNotSupportedError = LangCodeNotSupportedError;
exports.LangPackInvalidError = LangPackInvalidError;
exports.LanguageInvalidError = LanguageInvalidError;
exports.LastnameInvalidError = LastnameInvalidError;
exports.LimitInvalidError = LimitInvalidError;
exports.LimitPerPostInvalidError = LimitPerPostInvalidError;
exports.LinkNotModifiedError = LinkNotModifiedError;
exports.LocationInvalidError = LocationInvalidError;
exports.ManagerInvalidError = ManagerInvalidError;
exports.ManagerPermissionMissingError = ManagerPermissionMissingError;
exports.MaxDateInvalidError = MaxDateInvalidError;
exports.MaxIdInvalidError = MaxIdInvalidError;
exports.MaxQtsInvalidError = MaxQtsInvalidError;
exports.Md5ChecksumInvalidError = Md5ChecksumInvalidError;
exports.MediaAlreadyPaidError = MediaAlreadyPaidError;
exports.MediaCaptionTooLongError = MediaCaptionTooLongError;
exports.MediaEmptyError = MediaEmptyError;
exports.MediaFileInvalidError = MediaFileInvalidError;
exports.MediaGroupedInvalidError = MediaGroupedInvalidError;
exports.MediaInvalidError = MediaInvalidError;
exports.MediaNewInvalidError = MediaNewInvalidError;
exports.MediaPrevInvalidError = MediaPrevInvalidError;
exports.MediaTtlInvalidError = MediaTtlInvalidError;
exports.MediaTypeInvalidError = MediaTypeInvalidError;
exports.MediaVideoStoryMissingError = MediaVideoStoryMissingError;
exports.MegagroupGeoRequiredError = MegagroupGeoRequiredError;
exports.MegagroupIdInvalidError = MegagroupIdInvalidError;
exports.MegagroupPrehistoryHiddenError = MegagroupPrehistoryHiddenError;
exports.MegagroupRequiredError = MegagroupRequiredError;
exports.MemberNoLocationError = MemberNoLocationError;
exports.MemberOccupyPrimaryLocFailedError = MemberOccupyPrimaryLocFailedError;
exports.MessageAuthorRequiredError = MessageAuthorRequiredError;
exports.MessageDeleteForbiddenError = MessageDeleteForbiddenError;
exports.MessageEditTimeExpiredError = MessageEditTimeExpiredError;
exports.MessageEmptyError = MessageEmptyError;
exports.MessageIdInvalidError = MessageIdInvalidError;
exports.MessageIdsEmptyError = MessageIdsEmptyError;
exports.MessageNotModifiedError = MessageNotModifiedError;
exports.MessageNotReadYetError = MessageNotReadYetError;
exports.MessagePollClosedError = MessagePollClosedError;
exports.MessageRequiredError = MessageRequiredError;
exports.MessageTooLongError = MessageTooLongError;
exports.MessageTooOldError = MessageTooOldError;
exports.MethodInvalidError = MethodInvalidError;
exports.MinDateInvalidError = MinDateInvalidError;
exports.MonthInvalidError = MonthInvalidError;
exports.MsgIdInvalidError = MsgIdInvalidError;
exports.MsgTooOldError = MsgTooOldError;
exports.MsgVoiceMissingError = MsgVoiceMissingError;
exports.MsgVoiceTooLongError = MsgVoiceTooLongError;
exports.MsgWaitError = MsgWaitError;
exports.MsgWaitTimeoutError = MsgWaitTimeoutError;
exports.MsgidDecreaseRetryError = MsgidDecreaseRetryError;
exports.MtSendQueueTooLongError = MtSendQueueTooLongError;
exports.MultiMediaTooLongError = MultiMediaTooLongError;
exports.NameInvalidError = NameInvalidError;
exports.NeedActionMissingError = NeedActionMissingError;
exports.NeedChatInvalidError = NeedChatInvalidError;
exports.NeedMemberInvalidError = NeedMemberInvalidError;
exports.NetworkMigrateError = NetworkMigrateError;
exports.NewSaltInvalidError = NewSaltInvalidError;
exports.NewSettingsEmptyError = NewSettingsEmptyError;
exports.NewSettingsInvalidError = NewSettingsInvalidError;
exports.NextOffsetInvalidError = NextOffsetInvalidError;
exports.NoPaymentNeededError = NoPaymentNeededError;
exports.NogeneralHideForbiddenError = NogeneralHideForbiddenError;
exports.NotAllowedError = NotAllowedError;
exports.NotEligibleError = NotEligibleError;
exports.NotJoinedError = NotJoinedError;
exports.OauthRequestInvalidError = OauthRequestInvalidError;
exports.OffsetInvalidError = OffsetInvalidError;
exports.OffsetPeerIdInvalidError = OffsetPeerIdInvalidError;
exports.OptionInvalidError = OptionInvalidError;
exports.OptionsTooMuchError = OptionsTooMuchError;
exports.OrderInvalidError = OrderInvalidError;
exports.PackShortNameInvalidError = PackShortNameInvalidError;
exports.PackShortNameOccupiedError = PackShortNameOccupiedError;
exports.PackTitleInvalidError = PackTitleInvalidError;
exports.PackTypeInvalidError = PackTypeInvalidError;
exports.ParentPeerInvalidError = ParentPeerInvalidError;
exports.ParticipantCallFailedError = ParticipantCallFailedError;
exports.ParticipantIdInvalidError = ParticipantIdInvalidError;
exports.ParticipantJoinMissingError = ParticipantJoinMissingError;
exports.ParticipantVersionOutdatedError = ParticipantVersionOutdatedError;
exports.ParticipantsTooFewError = ParticipantsTooFewError;
exports.PasskeyOriginMismatchError = PasskeyOriginMismatchError;
exports.PasswordEmptyError = PasswordEmptyError;
exports.PasswordHashInvalidError = PasswordHashInvalidError;
exports.PasswordMissingError = PasswordMissingError;
exports.PasswordRecoveryExpiredError = PasswordRecoveryExpiredError;
exports.PasswordRecoveryNaError = PasswordRecoveryNaError;
exports.PasswordRequiredError = PasswordRequiredError;
exports.PasswordTooFreshError = PasswordTooFreshError;
exports.PaymentCredentialsInvalidError = PaymentCredentialsInvalidError;
exports.PaymentProviderInvalidError = PaymentProviderInvalidError;
exports.PaymentRequiredError = PaymentRequiredError;
exports.PaymentUnsupportedError = PaymentUnsupportedError;
exports.PeerFloodError = PeerFloodError;
exports.PeerHistoryEmptyError = PeerHistoryEmptyError;
exports.PeerIdInvalidError = PeerIdInvalidError;
exports.PeerIdNotSupportedError = PeerIdNotSupportedError;
exports.PeerTypesInvalidError = PeerTypesInvalidError;
exports.PeersListEmptyError = PeersListEmptyError;
exports.PersistentTimestampEmptyError = PersistentTimestampEmptyError;
exports.PersistentTimestampInvalidError = PersistentTimestampInvalidError;
exports.PersistentTimestampOutdatedError = PersistentTimestampOutdatedError;
exports.PhoneCodeEmptyError = PhoneCodeEmptyError;
exports.PhoneCodeExpiredError = PhoneCodeExpiredError;
exports.PhoneCodeHashEmptyError = PhoneCodeHashEmptyError;
exports.PhoneCodeInvalidError = PhoneCodeInvalidError;
exports.PhoneHashExpiredError = PhoneHashExpiredError;
exports.PhoneMigrateError = PhoneMigrateError;
exports.PhoneNotOccupiedError = PhoneNotOccupiedError;
exports.PhoneNumberAppSignupForbiddenError = PhoneNumberAppSignupForbiddenError;
exports.PhoneNumberBannedError = PhoneNumberBannedError;
exports.PhoneNumberFloodError = PhoneNumberFloodError;
exports.PhoneNumberInvalidError = PhoneNumberInvalidError;
exports.PhoneNumberOccupiedError = PhoneNumberOccupiedError;
exports.PhoneNumberUnoccupiedError = PhoneNumberUnoccupiedError;
exports.PhonePasswordFloodError = PhonePasswordFloodError;
exports.PhonePasswordProtectedError = PhonePasswordProtectedError;
exports.PhotoContentTypeInvalidError = PhotoContentTypeInvalidError;
exports.PhotoContentUrlEmptyError = PhotoContentUrlEmptyError;
exports.PhotoCropFileMissingError = PhotoCropFileMissingError;
exports.PhotoCropSizeSmallError = PhotoCropSizeSmallError;
exports.PhotoExtInvalidError = PhotoExtInvalidError;
exports.PhotoFileMissingError = PhotoFileMissingError;
exports.PhotoIdInvalidError = PhotoIdInvalidError;
exports.PhotoInvalidDimensionsError = PhotoInvalidDimensionsError;
exports.PhotoInvalidError = PhotoInvalidError;
exports.PhotoSaveFileInvalidError = PhotoSaveFileInvalidError;
exports.PhotoThumbUrlEmptyError = PhotoThumbUrlEmptyError;
exports.PinRestrictedError = PinRestrictedError;
exports.PinnedDialogsTooMuchError = PinnedDialogsTooMuchError;
exports.PinnedTooMuchError = PinnedTooMuchError;
exports.PinnedTopicNotModifiedError = PinnedTopicNotModifiedError;
exports.PollAnswerInvalidError = PollAnswerInvalidError;
exports.PollAnswersInvalidError = PollAnswersInvalidError;
exports.PollCountryRestrictedError = PollCountryRestrictedError;
exports.PollMemberRestrictedError = PollMemberRestrictedError;
exports.PollOptionDuplicateError = PollOptionDuplicateError;
exports.PollOptionInvalidError = PollOptionInvalidError;
exports.PollQuestionInvalidError = PollQuestionInvalidError;
exports.PollUnsupportedError = PollUnsupportedError;
exports.PollVoteRequiredError = PollVoteRequiredError;
exports.PostponedTimeoutError = PostponedTimeoutError;
exports.PrecheckoutFailedError = PrecheckoutFailedError;
exports.PremiumAccountRequiredError = PremiumAccountRequiredError;
exports.PremiumCurrentlyUnavailableError = PremiumCurrentlyUnavailableError;
exports.PremiumPurposeInvalidError = PremiumPurposeInvalidError;
exports.PremiumSubActiveUntilError = PremiumSubActiveUntilError;
exports.PreviousChatImportActiveWaitMinError = PreviousChatImportActiveWaitMinError;
exports.PreviousChatImportActiveWaitXminError = PreviousChatImportActiveWaitXminError;
exports.PricingChatInvalidError = PricingChatInvalidError;
exports.PrivacyKeyInvalidError = PrivacyKeyInvalidError;
exports.PrivacyPremiumRequiredError = PrivacyPremiumRequiredError;
exports.PrivacyTooLongError = PrivacyTooLongError;
exports.PrivacyValueInvalidError = PrivacyValueInvalidError;
exports.PtsChangeEmptyError = PtsChangeEmptyError;
exports.PublicBroadcastExpectedError = PublicBroadcastExpectedError;
exports.PublicChannelMissingError = PublicChannelMissingError;
exports.PublicKeyInvalidError = PublicKeyInvalidError;
exports.PublicKeyRequiredError = PublicKeyRequiredError;
exports.PurposeInvalidError = PurposeInvalidError;
exports.QueryIdEmptyError = QueryIdEmptyError;
exports.QueryIdInvalidError = QueryIdInvalidError;
exports.QueryTooShortError = QueryTooShortError;
exports.QuickRepliesBotNotAllowedError = QuickRepliesBotNotAllowedError;
exports.QuickRepliesTooMuchError = QuickRepliesTooMuchError;
exports.QuizAnswerMissingError = QuizAnswerMissingError;
exports.QuizCorrectAnswerInvalidError = QuizCorrectAnswerInvalidError;
exports.QuizCorrectAnswersEmptyError = QuizCorrectAnswersEmptyError;
exports.QuizCorrectAnswersTooMuchError = QuizCorrectAnswersTooMuchError;
exports.QuizMultipleInvalidError = QuizMultipleInvalidError;
exports.QuoteTextInvalidError = QuoteTextInvalidError;
Object.defineProperty(exports, "RPCErrorList_exports", {
	enumerable: true,
	get: function() {
		return RPCErrorList_exports;
	}
});
exports.RaiseHandForbiddenError = RaiseHandForbiddenError;
exports.RandomIdDuplicateError = RandomIdDuplicateError;
exports.RandomIdEmptyError = RandomIdEmptyError;
exports.RandomIdExpiredError = RandomIdExpiredError;
exports.RandomIdInvalidError = RandomIdInvalidError;
exports.RandomLengthInvalidError = RandomLengthInvalidError;
exports.RangesInvalidError = RangesInvalidError;
exports.ReactionEmptyError = ReactionEmptyError;
exports.ReactionInvalidError = ReactionInvalidError;
exports.ReactionsCountInvalidError = ReactionsCountInvalidError;
exports.ReactionsTooManyError = ReactionsTooManyError;
exports.ReceiptEmptyError = ReceiptEmptyError;
exports.ReflectorNotAvailableError = ReflectorNotAvailableError;
exports.RegIdGenerateFailedError = RegIdGenerateFailedError;
exports.ReplyMarkupBuyEmptyError = ReplyMarkupBuyEmptyError;
exports.ReplyMarkupGameEmptyError = ReplyMarkupGameEmptyError;
exports.ReplyMarkupInvalidError = ReplyMarkupInvalidError;
exports.ReplyMarkupTooLongError = ReplyMarkupTooLongError;
exports.ReplyMessageIdInvalidError = ReplyMessageIdInvalidError;
exports.ReplyMessagesTooMuchError = ReplyMessagesTooMuchError;
exports.ReplyToInvalidError = ReplyToInvalidError;
exports.ReplyToMonoforumPeerInvalidError = ReplyToMonoforumPeerInvalidError;
exports.ReplyToUserInvalidError = ReplyToUserInvalidError;
exports.RequestMsgExpiredError = RequestMsgExpiredError;
exports.RequestTokenInvalidError = RequestTokenInvalidError;
exports.ResellStarsTooFewError = ResellStarsTooFewError;
exports.ResellStarsTooMuchError = ResellStarsTooMuchError;
exports.ResetRequestMissingError = ResetRequestMissingError;
exports.ResultIdDuplicateError = ResultIdDuplicateError;
exports.ResultIdEmptyError = ResultIdEmptyError;
exports.ResultIdInvalidError = ResultIdInvalidError;
exports.ResultTypeInvalidError = ResultTypeInvalidError;
exports.ResultsTooMuchError = ResultsTooMuchError;
exports.RevoteNotAllowedError = RevoteNotAllowedError;
exports.RightForbiddenError = RightForbiddenError;
exports.RightsNotModifiedError = RightsNotModifiedError;
exports.RingtoneInvalidError = RingtoneInvalidError;
exports.RingtoneMimeInvalidError = RingtoneMimeInvalidError;
exports.RpcCallFailError = RpcCallFailError;
exports.RpcMcgetFailError = RpcMcgetFailError;
exports.RsaDecryptFailedError = RsaDecryptFailedError;
exports.SavedIdEmptyError = SavedIdEmptyError;
exports.ScheduleBotNotAllowedError = ScheduleBotNotAllowedError;
exports.ScheduleDateInvalidError = ScheduleDateInvalidError;
exports.ScheduleDateTooLateError = ScheduleDateTooLateError;
exports.ScheduleStatusPrivateError = ScheduleStatusPrivateError;
exports.ScheduleTooMuchError = ScheduleTooMuchError;
exports.ScoreInvalidError = ScoreInvalidError;
exports.SearchQueryEmptyError = SearchQueryEmptyError;
exports.SearchWithLinkNotSupportedError = SearchWithLinkNotSupportedError;
exports.SecondsInvalidError = SecondsInvalidError;
exports.SecureSecretRequiredError = SecureSecretRequiredError;
exports.SelfDeleteRestrictedError = SelfDeleteRestrictedError;
exports.SendAsPeerInvalidError = SendAsPeerInvalidError;
exports.SendCodeUnavailableError = SendCodeUnavailableError;
exports.SendMediaInvalidError = SendMediaInvalidError;
exports.SendMessageGameInvalidError = SendMessageGameInvalidError;
exports.SendMessageMediaInvalidError = SendMessageMediaInvalidError;
exports.SendMessageTypeInvalidError = SendMessageTypeInvalidError;
exports.SensitiveChangeForbiddenError = SensitiveChangeForbiddenError;
exports.SessionExpiredError = SessionExpiredError;
exports.SessionPasswordNeededError = SessionPasswordNeededError;
exports.SessionRevokedError = SessionRevokedError;
exports.SessionTooFreshError = SessionTooFreshError;
exports.SettingsInvalidError = SettingsInvalidError;
exports.Sha256HashInvalidError = Sha256HashInvalidError;
exports.ShortNameInvalidError = ShortNameInvalidError;
exports.ShortNameOccupiedError = ShortNameOccupiedError;
exports.ShortcutInvalidError = ShortcutInvalidError;
exports.ShortnameOccupyFailedError = ShortnameOccupyFailedError;
exports.SignInFailedError = SignInFailedError;
exports.SlotsEmptyError = SlotsEmptyError;
exports.SlowModeWaitError = SlowModeWaitError;
exports.SlowmodeMultiMsgsDisabledError = SlowmodeMultiMsgsDisabledError;
exports.SlugInvalidError = SlugInvalidError;
exports.SmsCodeCreateFailedError = SmsCodeCreateFailedError;
exports.SmsjobIdInvalidError = SmsjobIdInvalidError;
exports.SrpAInvalidError = SrpAInvalidError;
exports.SrpIdInvalidError = SrpIdInvalidError;
exports.SrpPasswordChangedError = SrpPasswordChangedError;
exports.StargiftAlreadyConvertedError = StargiftAlreadyConvertedError;
exports.StargiftAlreadyRefundedError = StargiftAlreadyRefundedError;
exports.StargiftAlreadyUpgradedError = StargiftAlreadyUpgradedError;
exports.StargiftAttributeInvalidError = StargiftAttributeInvalidError;
exports.StargiftExportInProgressError = StargiftExportInProgressError;
exports.StargiftInvalidError = StargiftInvalidError;
exports.StargiftMessageInvalidError = StargiftMessageInvalidError;
exports.StargiftNotFoundError = StargiftNotFoundError;
exports.StargiftNotOwnerError = StargiftNotOwnerError;
exports.StargiftNotUniqueError = StargiftNotUniqueError;
exports.StargiftObjectInvalidError = StargiftObjectInvalidError;
exports.StargiftOfferInvalidError = StargiftOfferInvalidError;
exports.StargiftOfferNotAllowedError = StargiftOfferNotAllowedError;
exports.StargiftOwnerInvalidError = StargiftOwnerInvalidError;
exports.StargiftPeerInvalidError = StargiftPeerInvalidError;
exports.StargiftResellCurrencyNotAllowedError = StargiftResellCurrencyNotAllowedError;
exports.StargiftResellTooEarlyError = StargiftResellTooEarlyError;
exports.StargiftSlugInvalidError = StargiftSlugInvalidError;
exports.StargiftTransferTooEarlyError = StargiftTransferTooEarlyError;
exports.StargiftUpgradeUnavailableError = StargiftUpgradeUnavailableError;
exports.StargiftUsageLimitedError = StargiftUsageLimitedError;
exports.StargiftUserUsageLimitedError = StargiftUserUsageLimitedError;
exports.StarrefAwaitingEndError = StarrefAwaitingEndError;
exports.StarrefExpiredError = StarrefExpiredError;
exports.StarrefHashRevokedError = StarrefHashRevokedError;
exports.StarrefPermilleInvalidError = StarrefPermilleInvalidError;
exports.StarrefPermilleTooLowError = StarrefPermilleTooLowError;
exports.StarsAmountInvalidError = StarsAmountInvalidError;
exports.StarsFormAmountMismatchError = StarsFormAmountMismatchError;
exports.StarsInvoiceInvalidError = StarsInvoiceInvalidError;
exports.StarsPaymentRequiredError = StarsPaymentRequiredError;
exports.StartParamEmptyError = StartParamEmptyError;
exports.StartParamInvalidError = StartParamInvalidError;
exports.StartParamTooLongError = StartParamTooLongError;
exports.StatsMigrateError = StatsMigrateError;
exports.StickerDocumentInvalidError = StickerDocumentInvalidError;
exports.StickerEmojiInvalidError = StickerEmojiInvalidError;
exports.StickerFileInvalidError = StickerFileInvalidError;
exports.StickerGifDimensionsError = StickerGifDimensionsError;
exports.StickerIdInvalidError = StickerIdInvalidError;
exports.StickerInvalidError = StickerInvalidError;
exports.StickerMimeInvalidError = StickerMimeInvalidError;
exports.StickerPngDimensionsError = StickerPngDimensionsError;
exports.StickerPngNopngError = StickerPngNopngError;
exports.StickerTgsNodocError = StickerTgsNodocError;
exports.StickerTgsNotgsError = StickerTgsNotgsError;
exports.StickerThumbPngNopngError = StickerThumbPngNopngError;
exports.StickerThumbTgsNotgsError = StickerThumbTgsNotgsError;
exports.StickerVideoBigError = StickerVideoBigError;
exports.StickerVideoNodocError = StickerVideoNodocError;
exports.StickerVideoNowebmError = StickerVideoNowebmError;
exports.StickerpackStickersTooMuchError = StickerpackStickersTooMuchError;
exports.StickersEmptyError = StickersEmptyError;
exports.StickersTooMuchError = StickersTooMuchError;
exports.StickersetInvalidError = StickersetInvalidError;
exports.StickersetNotModifiedError = StickersetNotModifiedError;
exports.StickersetOwnerAnonymousError = StickersetOwnerAnonymousError;
exports.StorageCheckFailedError = StorageCheckFailedError;
exports.StoreInvalidScalarTypeError = StoreInvalidScalarTypeError;
exports.StoriesNeverCreatedError = StoriesNeverCreatedError;
exports.StoriesTooMuchError = StoriesTooMuchError;
exports.StoryIdEmptyError = StoryIdEmptyError;
exports.StoryIdInvalidError = StoryIdInvalidError;
exports.StoryLiveAlreadyError = StoryLiveAlreadyError;
exports.StoryNotModifiedError = StoryNotModifiedError;
exports.StoryPeriodInvalidError = StoryPeriodInvalidError;
exports.StorySendFloodMonthlyError = StorySendFloodMonthlyError;
exports.StorySendFloodWeeklyError = StorySendFloodWeeklyError;
exports.SubscriptionExportMissingError = SubscriptionExportMissingError;
exports.SubscriptionIdInvalidError = SubscriptionIdInvalidError;
exports.SubscriptionPeriodInvalidError = SubscriptionPeriodInvalidError;
exports.SuggestedPostAmountInvalidError = SuggestedPostAmountInvalidError;
exports.SuggestedPostPeerInvalidError = SuggestedPostPeerInvalidError;
exports.SwitchPmTextEmptyError = SwitchPmTextEmptyError;
exports.SwitchWebviewUrlInvalidError = SwitchWebviewUrlInvalidError;
exports.TakeoutInitDelayError = TakeoutInitDelayError;
exports.TakeoutInvalidError = TakeoutInvalidError;
exports.TakeoutRequiredError = TakeoutRequiredError;
exports.TaskAlreadyExistsError = TaskAlreadyExistsError;
exports.TempAuthKeyAlreadyBoundError = TempAuthKeyAlreadyBoundError;
exports.TempAuthKeyEmptyError = TempAuthKeyEmptyError;
exports.TermsUrlInvalidError = TermsUrlInvalidError;
exports.TextdraftPeerInvalidError = TextdraftPeerInvalidError;
exports.ThemeFileInvalidError = ThemeFileInvalidError;
exports.ThemeFormatInvalidError = ThemeFormatInvalidError;
exports.ThemeInvalidError = ThemeInvalidError;
exports.ThemeMimeInvalidError = ThemeMimeInvalidError;
exports.ThemeParamsInvalidError = ThemeParamsInvalidError;
exports.ThemeSlugInvalidError = ThemeSlugInvalidError;
exports.ThemeTitleInvalidError = ThemeTitleInvalidError;
exports.TimeoutError = TimeoutError;
exports.TimezoneInvalidError = TimezoneInvalidError;
exports.TitleInvalidError = TitleInvalidError;
exports.TmpPasswordDisabledError = TmpPasswordDisabledError;
exports.TmpPasswordInvalidError = TmpPasswordInvalidError;
exports.ToIdInvalidError = ToIdInvalidError;
exports.ToLangInvalidError = ToLangInvalidError;
exports.TodoItemDuplicateError = TodoItemDuplicateError;
exports.TodoItemsEmptyError = TodoItemsEmptyError;
exports.TodoItemsTooMuchError = TodoItemsTooMuchError;
exports.TodoNotModifiedError = TodoNotModifiedError;
exports.TokenEmptyError = TokenEmptyError;
exports.TokenInvalidError = TokenInvalidError;
exports.TokenTypeInvalidError = TokenTypeInvalidError;
exports.TopicCloseSeparatelyError = TopicCloseSeparatelyError;
exports.TopicClosedError = TopicClosedError;
exports.TopicDeletedError = TopicDeletedError;
exports.TopicHideSeparatelyError = TopicHideSeparatelyError;
exports.TopicIdInvalidError = TopicIdInvalidError;
exports.TopicNotModifiedError = TopicNotModifiedError;
exports.TopicTitleEmptyError = TopicTitleEmptyError;
exports.TopicsEmptyError = TopicsEmptyError;
exports.TransactionIdInvalidError = TransactionIdInvalidError;
exports.TranscriptionFailedError = TranscriptionFailedError;
exports.TranslateReqFailedError = TranslateReqFailedError;
exports.TranslateReqQuotaExceededError = TranslateReqQuotaExceededError;
exports.TranslationTimeoutError = TranslationTimeoutError;
exports.TranslationsDisabledError = TranslationsDisabledError;
exports.TtlDaysInvalidError = TtlDaysInvalidError;
exports.TtlMediaInvalidError = TtlMediaInvalidError;
exports.TtlPeriodInvalidError = TtlPeriodInvalidError;
exports.TwoFaConfirmWaitError = TwoFaConfirmWaitError;
exports.TypeConstructorInvalidError = TypeConstructorInvalidError;
exports.TypesEmptyError = TypesEmptyError;
exports.UnknownErrorError = UnknownErrorError;
exports.UnknownMethodError = UnknownMethodError;
exports.UnsupportedError = UnsupportedError;
exports.UntilDateInvalidError = UntilDateInvalidError;
exports.UpdateAppToLoginError = UpdateAppToLoginError;
exports.UrlExpiredError = UrlExpiredError;
exports.UrlInvalidError = UrlInvalidError;
exports.UsageLimitInvalidError = UsageLimitInvalidError;
exports.UserAdminInvalidError = UserAdminInvalidError;
exports.UserAlreadyInvitedError = UserAlreadyInvitedError;
exports.UserAlreadyParticipantError = UserAlreadyParticipantError;
exports.UserBannedInChannelError = UserBannedInChannelError;
exports.UserBlockedError = UserBlockedError;
exports.UserBotError = UserBotError;
exports.UserBotInvalidError = UserBotInvalidError;
exports.UserBotRequiredError = UserBotRequiredError;
exports.UserBotToBotDisabledError = UserBotToBotDisabledError;
exports.UserChannelsTooMuchError = UserChannelsTooMuchError;
exports.UserCreatorError = UserCreatorError;
exports.UserDeactivatedBanError = UserDeactivatedBanError;
exports.UserDeactivatedError = UserDeactivatedError;
exports.UserDeletedError = UserDeletedError;
exports.UserDisallowedStargiftsError = UserDisallowedStargiftsError;
exports.UserGiftUnavailableError = UserGiftUnavailableError;
exports.UserIdInvalidError = UserIdInvalidError;
exports.UserInvalidError = UserInvalidError;
exports.UserIsBlockedError = UserIsBlockedError;
exports.UserIsBotError = UserIsBotError;
exports.UserKickedError = UserKickedError;
exports.UserMigrateError = UserMigrateError;
exports.UserNotMutualContactError = UserNotMutualContactError;
exports.UserNotParticipantError = UserNotParticipantError;
exports.UserPermissionDeniedError = UserPermissionDeniedError;
exports.UserPrivacyRestrictedError = UserPrivacyRestrictedError;
exports.UserPublicMissingError = UserPublicMissingError;
exports.UserRestrictedError = UserRestrictedError;
exports.UserVolumeInvalidError = UserVolumeInvalidError;
exports.UsernameInvalidError = UsernameInvalidError;
exports.UsernameNotModifiedError = UsernameNotModifiedError;
exports.UsernameNotOccupiedError = UsernameNotOccupiedError;
exports.UsernameOccupiedError = UsernameOccupiedError;
exports.UsernamePurchaseAvailableError = UsernamePurchaseAvailableError;
exports.UsernameSuffixMissingError = UsernameSuffixMissingError;
exports.UsernamesActiveTooMuchError = UsernamesActiveTooMuchError;
exports.UserpicPrivacyRequiredError = UserpicPrivacyRequiredError;
exports.UserpicUploadRequiredError = UserpicUploadRequiredError;
exports.UsersTooFewError = UsersTooFewError;
exports.UsersTooMuchError = UsersTooMuchError;
exports.VenueIdInvalidError = VenueIdInvalidError;
exports.VideoContentTypeInvalidError = VideoContentTypeInvalidError;
exports.VideoDurationInvalidError = VideoDurationInvalidError;
exports.VideoFileInvalidError = VideoFileInvalidError;
exports.VideoPauseForbiddenError = VideoPauseForbiddenError;
exports.VideoStopForbiddenError = VideoStopForbiddenError;
exports.VideoTitleEmptyError = VideoTitleEmptyError;
exports.VoiceMessagesForbiddenError = VoiceMessagesForbiddenError;
exports.WallpaperFileInvalidError = WallpaperFileInvalidError;
exports.WallpaperInvalidError = WallpaperInvalidError;
exports.WallpaperMimeInvalidError = WallpaperMimeInvalidError;
exports.WallpaperNotFoundError = WallpaperNotFoundError;
exports.WcConvertUrlInvalidError = WcConvertUrlInvalidError;
exports.WebappReqIdInvalidError = WebappReqIdInvalidError;
exports.WebauthTokenExpiredError = WebauthTokenExpiredError;
exports.WebdocumentInvalidError = WebdocumentInvalidError;
exports.WebdocumentMimeInvalidError = WebdocumentMimeInvalidError;
exports.WebdocumentSizeTooBigError = WebdocumentSizeTooBigError;
exports.WebdocumentUrlEmptyError = WebdocumentUrlEmptyError;
exports.WebdocumentUrlInvalidError = WebdocumentUrlInvalidError;
exports.WebpageCurlFailedError = WebpageCurlFailedError;
exports.WebpageMediaEmptyError = WebpageMediaEmptyError;
exports.WebpageNotFoundError = WebpageNotFoundError;
exports.WebpageUrlInvalidError = WebpageUrlInvalidError;
exports.WebpushAuthInvalidError = WebpushAuthInvalidError;
exports.WebpushKeyInvalidError = WebpushKeyInvalidError;
exports.WebpushTokenInvalidError = WebpushTokenInvalidError;
exports.WorkerBusyTooLongRetryError = WorkerBusyTooLongRetryError;
exports.YouBlockedUserError = YouBlockedUserError;
exports.YourPrivacyRestrictedError = YourPrivacyRestrictedError;
exports.baseErrors = baseErrors;
exports.rpcErrorRe = rpcErrorRe;
exports.rpcErrorsDict = rpcErrorsDict;
exports.rpcErrorsRe = rpcErrorsRe;
