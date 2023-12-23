
import React from 'react';
import Spacer from "../components/spacer";
import GitHubCalendar from 'react-github-calendar';

const Contribution = ({ src, image }) => {
    const selectLastHalfYear = contributions => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        const shownMonths = 4;

        return contributions.filter(activity => {
            const date = new Date(activity.date);
            const monthOfDay = date.getMonth();

            return (
                date.getFullYear() === currentYear &&
                monthOfDay > currentMonth - shownMonths &&
                monthOfDay <= currentMonth
            );
        });
    };


    return (
        <>
            <div className="card card-2x1" id='only-pc'>
                <b>Github에 심은 잔디</b>
                <Spacer y={20} />
                <GitHubCalendar username="icecream0910"
                    labels={{
                        totalCount: "올해 {{count}}개의 기여",
                    }} />
            </div>

            <div className="card card-2x1" id='only-mobile'>
                <b>Github에 심은 잔디</b>
                <Spacer y={20} />
                <GitHubCalendar username="icecream0910" transformData={selectLastHalfYear} hideColorLegend
                    labels={{
                        totalCount: "최근 3개월 간 {{count}}개의 기여",
                    }} />
            </div>
        </>
    );
};

export default Contribution;
