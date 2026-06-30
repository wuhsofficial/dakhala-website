import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import EduAnimation from '../components/EduAnimation';
import { publicUniversities, privateUniversities, semiGovtUniversities, getUniversityBySlug, getUniversityLogo } from '../data/universities';
import Campus3DModel from '../components/Campus3DModel';
import UniversityCard from '../components/UniversityCard';
import { useDataStore } from '../store/useDataStore';
import EditableBlock from '../components/EditableBlock';

export default function AdmissionGuide() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const officialLinks = {
    fast: "https://admissions.nu.edu.pk/",
    comsats: "https://admissions.comsats.edu.pk/",
    "uet-lahore": "https://ecat.uet.edu.pk/",
    umt: "https://onlineadmissions.umt.edu.pk/",
    bzu: "https://portal.bzu.edu.pk/admissions/",
    lums: "https://admissions.lums.edu.pk/application/",
    nust: "https://ugadmissions.nust.edu.pk/",
    qau: "https://ugadmissions.qau.edu.pk/",
    pu: "https://pu.edu.pk/home/admission_notices",
    giki: "https://giki.edu.pk/admissions/admissions-undergraduates/",
    itu: "https://itu.edu.pk/admissions/",
    muet: "https://admissions.muet.edu.pk/",
    "uet-taxila": "https://admissions.uettaxila.edu.pk",
    "gcu-lahore": "https://gcu.edu.pk/admissions.php",
    ned: "https://www.neduet.edu.pk/admission",
    air: "https://portals.au.edu.pk",
    pieas: "https://admissions.pieas.edu.pk",
    uaf: "https://admissions.uaf.edu.pk",
    uhs: "https://www.uhs.edu.pk/admissions.php",
    ist: "https://www.ist.edu.pk/admission?section=undergraduate"
  };

  const getSectorBadge = (uni) => {
    if (publicUniversities.some(u => u.id === uni.id)) return 'Public Sector';
    if (semiGovtUniversities.some(u => u.id === uni.id)) return 'Semi-Government';
    return 'Private Sector';
  };

  const { universities, updateUniversity } = useDataStore();

  // INDIVIDUAL UNI PAGE
  if (slug) {
    const uni = universities.find(u => u.slug === slug);

    if (!uni) {
      return (
        <div className="text-center py-20 bg-cloudy dark:bg-maqsadNavy min-h-screen text-ink dark:text-white flex flex-col items-center justify-center space-y-4">
          <h2 className="text-xl font-bold">Guide Not Found</h2>
          <Link to="/admission-guide" className="text-gold font-semibold underline mt-2 inline-block">Back to Guides</Link>
        </div>
      );
    }

    return (
      <div className="py-6 flex flex-col space-y-6 text-sm md:text-base">
        <Helmet>
          <title>{uni.name} Admission Guide 2026 | Dakhala</title>
          <meta name="description" content={`Complete admission guide for ${uni.name}. Check eligibility, fee structure, hostel details, and how to apply for 2026 admissions.`} />
        </Helmet>
        {/* Back Button */}
        <div>
          <button
            onClick={() => navigate('/admission-guide')}
            className="text-[11px] font-bold text-ink hover:text-gold transition-colors flex items-center gap-1 focus:outline-none"
          >
            ← Back to Landing
          </button>
        </div>

        {/* Header Block */}
        <div className="bg-white dark:bg-white/[0.02] border border-border dark:border-white/10 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 select-none text-ink dark:text-white">
          <div className="flex items-center gap-4">
            <img 
              src={getUniversityLogo(uni.id)} 
              alt={`${uni.name} Logo`} 
              className="w-16 h-16 md:w-20 md:h-20 object-contain bg-white rounded-2xl p-2 border border-border/50 shadow-md"
            />
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold text-ink dark:text-white leading-tight">
                <EditableBlock value={uni.name} onSave={(val) => updateUniversity(uni.id, { name: val })} />
              </h2>
              <span className="inline-block mt-2 px-2.5 py-1 bg-gold text-white text-xs font-bold uppercase tracking-wider rounded">
                {getSectorBadge(uni)}
              </span>
            </div>
          </div>
          <EduAnimation type="guide" />
        </div>

        {/* Text Content Sections with 3-column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-ink dark:text-white">
          <div className="lg:col-span-2 space-y-4">
            {/* Eligibility */}
            <div className="bg-white dark:bg-white/[0.02] border border-border dark:border-white/10 rounded-xl p-5">
              <h3 className="text-base md:text-lg font-bold text-ink dark:text-white mb-2.5 pb-1 border-b border-border dark:border-white/10 uppercase tracking-wider">Eligibility</h3>
              <p className="text-muted dark:text-gray-400 leading-relaxed text-sm md:text-base">
                <EditableBlock 
                  type="textarea"
                  value={uni.guideEligibility || `Applicants must hold a minimum of 60% marks in SSC (Matriculation) or equivalent O-Level, and a minimum of 60% (or 50% for select engineering domains) in HSSC (Intermediate Pre-Engineering, Pre-Medical, or ICS). A valid score in ${uni.entryTest} is mandatory for competitive selection.`} 
                  onSave={(val) => updateUniversity(uni.id, { guideEligibility: val })} 
                />
              </p>
            </div>

            {/* Required Documents */}
            <div className="bg-white dark:bg-white/[0.02] border border-border dark:border-white/10 rounded-xl p-5">
              <h3 className="text-base md:text-lg font-bold text-ink dark:text-white mb-2.5 pb-1 border-b border-border dark:border-white/10 uppercase tracking-wider">Required Documents</h3>
              <div className="text-sm md:text-base text-muted dark:text-gray-400 leading-relaxed whitespace-pre-wrap">
                <EditableBlock 
                  type="textarea"
                  value={uni.guideDocuments || `• Attested copies of Matric / O-Level marksheet and certificates.
• Attested copies of Intermediate / A-Level marksheet.
• IBCC equivalence certificate (for foreign qualifications).
• CNIC / B-Form and Father's CNIC copies.
• Original paid bank deposit receipt of application processing fee.
• 4 passport-sized photographs with blue background.`} 
                  onSave={(val) => updateUniversity(uni.id, { guideDocuments: val })} 
                />
              </div>
            </div>

            {/* Fee Structure */}
            <div className="bg-white dark:bg-white/[0.02] border border-border dark:border-white/10 rounded-xl p-5">
              <h3 className="text-base md:text-lg font-bold text-ink dark:text-white mb-2.5 pb-1 border-b border-border dark:border-white/10 uppercase tracking-wider">Fee Structure</h3>
              <p className="text-sm md:text-base text-muted dark:text-gray-400 leading-relaxed">
                <EditableBlock 
                  type="textarea"
                  value={uni.guideFee || `The semester fee for undergraduate programs is approximately Rs. ${uni.feePerSemester?.toLocaleString() || ''} per semester. Admission fee (one-time) and a refundable security deposit of Rs. 10,000–20,000 are payable during initial enrollment.`} 
                  onSave={(val) => updateUniversity(uni.id, { guideFee: val })} 
                />
              </p>
            </div>

            {/* Hostel */}
            <div className="bg-white dark:bg-white/[0.02] border border-border dark:border-white/10 rounded-xl p-5">
              <h3 className="text-base md:text-lg font-bold text-ink dark:text-white mb-2.5 pb-1 border-b border-border dark:border-white/10 uppercase tracking-wider">Hostel Accommodation</h3>
              <p className="text-sm md:text-base text-muted dark:text-gray-400 leading-relaxed">
                <EditableBlock 
                  type="textarea"
                  value={uni.guideHostel || `On-campus residential facilities are available for outstation students on a first-come, first-served merit basis. Hostel charges range between Rs. 15,000 to Rs. 25,000 per semester (excluding food).`} 
                  onSave={(val) => updateUniversity(uni.id, { guideHostel: val })} 
                />
              </p>
            </div>

            {/* How to Apply */}
            <div className="bg-white dark:bg-white/[0.02] border border-border dark:border-white/10 rounded-xl p-5">
              <h3 className="text-base md:text-lg font-bold text-ink dark:text-white mb-2.5 pb-1 border-b border-border dark:border-white/10 uppercase tracking-wider">How to Apply</h3>
              <div className="text-sm md:text-base text-muted dark:text-gray-400 leading-relaxed whitespace-pre-wrap">
                <EditableBlock 
                  type="textarea"
                  value={uni.guideHowToApply || `1. Create an account on the official university undergraduate admission portal.
2. Fill out the personal profile and educational credentials.
3. Select your preferred degree programs and upload required documents.
4. Generate the application fee challan, deposit it, and upload the paid copy.
5. Submit the application online and track status on the portal dashboard.`} 
                  onSave={(val) => updateUniversity(uni.id, { guideHowToApply: val })} 
                />
              </div>

              {officialLinks[uni.id] && (
                <div className="mt-4 pt-4 border-t border-border/50 dark:border-white/10">
                  <span className="text-sm font-bold text-ink dark:text-white">Official Portal: </span>
                  <EditableBlock 
                    value={uni.officialPortalLink || officialLinks[uni.id]} 
                    onSave={(val) => updateUniversity(uni.id, { officialPortalLink: val })} 
                  />
                  <a 
                    href={uni.officialPortalLink || officialLinks[uni.id]} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-gold hover:underline font-medium break-all block mt-1"
                  >
                    Open Link
                  </a>
                </div>
              )}
            </div>

            {/* Contact */}
            <div className="bg-white dark:bg-white/[0.02] border border-border dark:border-white/10 rounded-xl p-5">
              <h3 className="text-base md:text-lg font-bold text-ink dark:text-white mb-2.5 pb-1 border-b border-border dark:border-white/10 uppercase tracking-wider">Contact Information</h3>
              <div className="text-sm md:text-base text-muted dark:text-gray-400 leading-relaxed whitespace-pre-wrap">
                <EditableBlock 
                  type="textarea"
                  value={uni.guideContact || `Admissions Office: ${uni.name}, ${uni.city}, Pakistan.
Phone: +92 (51) 111-222-333
Email: admissions@${uni.id}.edu.pk`} 
                  onSave={(val) => updateUniversity(uni.id, { guideContact: val })} 
                />
              </div>
            </div>
          </div>

          {/* 3D Model in Right Sidebar Column */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white dark:bg-white/[0.02] border border-border dark:border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg">
              <h3 className="text-base font-bold text-ink dark:text-white mb-4 pb-2 border-b border-border dark:border-white/10 uppercase tracking-wider w-full">3D Campus Model</h3>
              <div className="w-full h-64 flex items-center justify-center">
                <Campus3DModel colorHex={uni.colorHex} uniId={uni.id} />
              </div>
              <p className="text-xs text-muted mt-4 leading-relaxed font-semibold">
                Interactive 3D representation of the official {uni.shortName} emblem. Click & drag horizontally to orbit.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LANDING PAGE
  return (
    <div className="py-6 flex flex-col space-y-8 text-[13px]">
      <Helmet>
        <title>University Admission Guides 2026 | Dakhala</title>
        <meta name="description" content="Comprehensive admission guides for top universities in Pakistan including NUST, FAST, LUMS, GIKI, UET, and more. Find eligibility, fee structures, and application procedures." />
      </Helmet>
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-2xl mx-auto w-full text-center md:text-left relative z-10 select-none">
        <div className="space-y-2 flex-1">
          <h2 className="text-xl md:text-2xl font-extrabold text-ink dark:text-white uppercase tracking-wide">Admission Guides</h2>
          <p className="text-[12px] text-muted dark:text-gray-400 max-w-md">Click on any university below to read the comprehensive admission guide.</p>
        </div>
        <EduAnimation type="guide" />
      </div>

      {/* 1. Public Sector Section */}
      <div className="flex flex-col space-y-3">
        <div className="flex items-center pl-3 border-l-[3px] border-l-gold select-none">
          <h3 className="text-[13px] font-medium text-ink dark:text-white leading-none uppercase tracking-wide">Public Sector</h3>
          <span className="text-[11px] text-muted dark:text-gray-400 font-bold ml-2">({publicUniversities.length} Guides)</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {universities.filter(u => publicUniversities.some(pu => pu.id === u.id)).map(uni => (
            <Tilt key={uni.id} tiltMaxAngleX={12} tiltMaxAngleY={12} scale={1.03} transitionSpeed={2000}>
              <UniversityCard
                university={uni}
                onClick={() => navigate(`/admission-guide/${uni.slug}`)}
              />
            </Tilt>
          ))}
        </div>
      </div>

      {/* 2. Private Sector Section */}
      <div className="flex flex-col space-y-3">
        <div className="flex items-center pl-3 border-l-[3px] border-l-gold select-none">
          <h3 className="text-[13px] font-medium text-ink dark:text-white leading-none uppercase tracking-wide">Private Sector</h3>
          <span className="text-[11px] text-muted dark:text-gray-400 font-bold ml-2">({privateUniversities.length} Guides)</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {universities.filter(u => privateUniversities.some(pu => pu.id === u.id)).map(uni => (
            <Tilt key={uni.id} tiltMaxAngleX={12} tiltMaxAngleY={12} scale={1.03} transitionSpeed={2000}>
              <UniversityCard
                university={uni}
                onClick={() => navigate(`/admission-guide/${uni.slug}`)}
              />
            </Tilt>
          ))}
        </div>
      </div>

      {/* 3. Semi-Government Section */}
      <div className="flex flex-col space-y-3">
        <div className="flex items-center pl-3 border-l-[3px] border-l-gold select-none">
          <h3 className="text-[13px] font-medium text-ink dark:text-white leading-none uppercase tracking-wide">Semi-Government</h3>
          <span className="text-[11px] text-muted dark:text-gray-400 font-bold ml-2">({semiGovtUniversities.length} Guides)</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-xl">
          {universities.filter(u => semiGovtUniversities.some(pu => pu.id === u.id)).map(uni => (
            <Tilt key={uni.id} tiltMaxAngleX={12} tiltMaxAngleY={12} scale={1.03} transitionSpeed={2000}>
              <UniversityCard
                university={uni}
                onClick={() => navigate(`/admission-guide/${uni.slug}`)}
              />
            </Tilt>
          ))}
        </div>
      </div>
    </div>
  );
}
