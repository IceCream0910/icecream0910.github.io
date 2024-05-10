
import React from 'react';
import Spacer from "../components/spacer";
import GitHubCalendar from 'react-github-calendar';

const Contribution = ({ src, image }) => {
    const selectLastHalfYear = contributions => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        const shownMonths = 4;

        const startYear = currentMonth < shownMonths ? currentYear - 1 : currentYear;
        const startMonth = currentMonth < shownMonths ? (currentMonth + 12 - shownMonths) % 12 : currentMonth - shownMonths;

        return contributions.filter(activity => {
            const date = new Date(activity.date);
            const year = date.getFullYear();
            const month = date.getMonth();

            return (
                (year === startYear && month >= startMonth) ||
                (year === currentYear && month <= currentMonth)
            );
        });
    };


    return (
        <>
            <div className="card card-2x1 green" id='only-pc' style={{
                aspectRatio: 'unset'
            }}>
                <b>Github에 심은 잔디</b>
                <Spacer y={20} />
                <GitHubCalendar username="icecream0910"
                    labels={{
                        totalCount: "지난 1년 동안 {{count}}개의 기여",
                    }} />
            </div>

            <div className="card card-1x1 green" id='only-mobile' style={{
                aspectRatio: 'unset'
            }}>
                <b>Github에 심은 잔디</b>
                <Spacer y={20} />
                <GitHubCalendar username="icecream0910" transformData={selectLastHalfYear} hideColorLegend
                    labels={{
                        totalCount: "지난 4개월 간 {{count}}개의 기여",
                    }} />
            </div>
        </>
    );
};

export default Contribution;
