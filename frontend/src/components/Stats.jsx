import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Stats = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const stats = [
    { value: '99%', label: 'Customer satisfaction' },
    { value: '15k', label: 'Online Patients' },
    { value: '12k', label: 'Patients Recovered' },
    { value: '240%', label: 'Company growth' },
  ];

  return (
    <section className="w-full py-12">
      <div className="text-center mb-10" data-aos="fade-up">
        <h2 className="text-primary text-2xl font-semibold">Our results in numbers</h2>
      </div>
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-y-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center" data-aos="zoom-in" data-aos-delay={index * 200}>
            <div className="text-primary text-3xl font-bold">{stat.value}</div>
            <div className="text-black mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
