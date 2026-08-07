package core

type TypebotError struct {
	IsTypebotError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewTypebotError(code string, msg string, ctx *Context) *TypebotError {
	return &TypebotError{
		IsTypebotError: true,
		Sdk:              "Typebot",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *TypebotError) Error() string {
	return e.Msg
}
