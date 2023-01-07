import { Modes, Nullable } from '@/types/misc';
import React, { FC, useState } from 'react';
import Menu from '@/components/Conversations/Menu';
import { useConversationList } from '@/hooks/api/conversation';
import { debounce } from 'lodash-es';
import Container from '@/components/Conversations/Container';
import { useNavigate } from '@tanstack/react-location';

type Props = {
    mode: Modes;
};

const Conversations: FC<Props> = ({ mode }) => {
    const [keyword, setKeyword] = useState<Nullable<string>>();
    const conversations = useConversationList(mode, keyword);
    const navigate = useNavigate();

    const search = debounce((keyword: string) => {
        if (keyword.length >= 2) {
            setKeyword(keyword);
        } else {
            setKeyword(null);
        }
    }, 750);

    return (
        <Container>
            <Menu
                onSearch={(keyword) => search(keyword)}
                conversations={conversations}
                onChange={(conversation) =>
                    navigate({
                        to: `/${mode}/dashboard/conversations/${conversation.id}`,
                    })
                }
            />
        </Container>
    );
};

export default Conversations;
