import React from 'react';
import StichLockMachine from '../../../../components/swingMachines/stichLockMachine/Jacka5eadiagram';
import ButtonLockMachine from '../../../../components/swingMachines/buttonLockMachine/ButtonLockMachine';

const SwingMachine = () => {
    return (
        <div>
            <div className='mb-4'>
                <StichLockMachine/>
            </div>
            <div>
                <ButtonLockMachine/>
            </div>
        </div>
    );
};

export default SwingMachine;