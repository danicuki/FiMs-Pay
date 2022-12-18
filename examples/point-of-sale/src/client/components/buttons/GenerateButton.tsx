import { useWallet } from "@solana/wallet-adapter-react";
import React, { FC, MouseEventHandler, ReactNode, useCallback, useMemo, useState } from 'react';
import { FormattedMessage } from "react-intl";
import { PaymentStatus, usePayment } from '../../hooks/usePayment';
import { FAUCET } from "../../utils/constants";
import { IS_MERCHANT_POS } from "../../utils/env";
import css from './GenerateButton.module.css';

export interface GenerateButtonProps {
    id: string;
}

export const GenerateButton: FC<GenerateButtonProps> = ({ id }) => {
    const { amount, status, generate, balance, selectWallet } = usePayment();
    const { publicKey, connecting } = useWallet();

    const [needRefresh, setNeedRefresh] = useState(false);

    const hasInsufficientBalance = useMemo(() => balance && (balance <= 0 || (amount && balance < parseFloat(amount.toString()))), [balance, amount]);

    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        () => {
            if (!hasInsufficientBalance) {
                if (publicKey || IS_MERCHANT_POS) {
                    generate();
                } else if (!connecting) {
                    selectWallet();
                }
            } else {
                if (needRefresh) {
                    setNeedRefresh(false);
                    //TODO
                } else {
                    window.open(FAUCET, '_blank');
                    setNeedRefresh(true);
                }
            }
        }, [generate, publicKey, selectWallet, hasInsufficientBalance, connecting, needRefresh]);

    return (
        <button
            className={css.root}
            type="button"
            onClick={handleClick}
            disabled={publicKey !== null && !connecting && (!amount || amount.isLessThanOrEqualTo(0) || (status !== PaymentStatus.New && status !== PaymentStatus.Error))}
        >
            <FormattedMessage id={!hasInsufficientBalance ? publicKey || IS_MERCHANT_POS ? id : connecting ? "connecting" : "connect" : needRefresh ? "reload" : "supply"} />
        </button>
    );
};
