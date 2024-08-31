import React, {ChangeEvent} from 'react';

type EditableSpanProps = {
    value: string,
    onChange: (newTitle: string) => void,
}
export const EditableSpan = React.memo(({value, onChange}: EditableSpanProps) => {

    const [editMode, setEditMode] = React.useState<boolean>(false)
    const [title, setTitle] = React.useState<string>(value)

    const activateEditModeHandler = () => {
        setEditMode(true)
    }
    const deactivateEditModeHandler = () => {
        setEditMode(false)
        onChange(title)
    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    return (
        <>
            {editMode ? (
                    <input value={title}
                           autoFocus
                           onBlur={deactivateEditModeHandler}
                           onChange={changeTitleHandler}
                    />
                )
                : (
                    <span onDoubleClick={activateEditModeHandler}>{value}</span>
                )}
        </>
    )
});

