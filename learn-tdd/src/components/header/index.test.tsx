import {MemoryRouter, Route, Routes} from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import Header from './index';

describe('This is Header Component', () => {
    test('Render Header Component Correctly', () => {

        render(
            <MemoryRouter>
                <Routes>
                    <Route path='/' element={<Header/>} />
                </Routes>
            </MemoryRouter>
        )

        const label = screen.getByText('할 일 목록');

        expect(label).toBeInTheDocument();
    })

    test('Render Header Component Correctly with /add URL', () => {

        render(
            <MemoryRouter>
                <Routes>
                    <Route path='/add' element={<Header/>} />
                </Routes>
            </MemoryRouter>
        )

        const label = screen.getByText('할 일 추가');

        expect(label).toBeInTheDocument();
    })

})