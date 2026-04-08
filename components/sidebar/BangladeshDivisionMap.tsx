'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const DIVISIONS = [
  { id: 'rangpur', name: 'রংপুর' },
  { id: 'mymensingh', name: 'ময়মনসিংহ' },
  { id: 'sylhet', name: 'সিলেট' },
  { id: 'rajshahi', name: 'রাজশাহী' },
  { id: 'dhaka', name: 'ঢাকা' },
  { id: 'khulna', name: 'খুলনা' },
  { id: 'barishal', name: 'বরিশাল', svgId: 'borishal' },
  { id: 'chattogram', name: 'চট্টগ্রাম', svgId: 'chittagong' },
];

const DISTRICTS: Record<string, { id: string; name: string }[]> = {
  rangpur: [
    { id: 'rangpur', name: 'রংপুর' },
    { id: 'dinajpur', name: 'দিনাজপুর' },
    { id: 'kurigram', name: 'কুড়িগ্রাম' },
    { id: 'gaibandha', name: 'গাইবান্ধা' },
    { id: 'nilphamari', name: 'নীলফামারী' },
    { id: 'lalmonirhat', name: 'লালমনিরহাট' },
    { id: 'thakurgaon', name: 'ঠাকুরগাঁও' },
    { id: 'panchagarh', name: 'পঞ্চগড়' },
  ],
  mymensingh: [
    { id: 'mymensingh', name: 'ময়মনসিংহ' },
    { id: 'jamalpur', name: 'জামালপুর' },
    { id: 'netrokona', name: 'নেত্রকোণা' },
    { id: 'sherpur', name: 'শেরপুর' },
  ],
  sylhet: [
    { id: 'sylhet', name: 'সিলেট' },
    { id: 'moulvibazar', name: 'মৌলভীবাজার' },
    { id: 'habiganj', name: 'হবিগঞ্জ' },
    { id: 'sunamganj', name: 'সুনামগঞ্জ' },
  ],
  rajshahi: [
    { id: 'rajshahi', name: 'রাজশাহী' },
    { id: 'bogra', name: 'বগুড়া' },
    { id: 'pabna', name: 'পাবনা' },
    { id: 'natore', name: 'নাটোর' },
    { id: 'naogaon', name: 'নওগাঁ' },
    { id: 'nawabganj', name: 'নবাবগঞ্জ' },
    { id: 'sirajganj', name: 'সিরাজগঞ্জ' },
    { id: 'joypurhat', name: 'জয়পুরহাট' },
  ],
  dhaka: [
    { id: 'dhaka', name: 'ঢাকা' },
    { id: 'gazipur', name: 'গাজীপুর' },
    { id: 'narayanganj', name: 'নারায়ণগঞ্জ' },
    { id: 'tangail', name: 'টাঙ্গাইল' },
    { id: 'kishoreganj', name: 'কিশোরগঞ্জ' },
    { id: 'manikganj', name: 'মানিকগঞ্জ' },
    { id: 'munshiganj', name: 'মুন্সিগঞ্জ' },
    { id: 'narsingdi', name: 'নরসিংদী' },
    { id: 'faridpur', name: 'ফরিদপুর' },
    { id: 'gopalganj', name: 'গোপালগঞ্জ' },
    { id: 'madaripur', name: 'মাদারীপুর' },
    { id: 'rajbari', name: 'রাজবাড়ী' },
    { id: 'shariatpur', name: 'শরীয়তপুর' },
  ],
  khulna: [
    { id: 'khulna', name: 'খুলনা' },
    { id: 'jessore', name: 'যশোর' },
    { id: 'satkhira', name: 'সাতক্ষীরা' },
    { id: 'bagerhat', name: 'বাগেরহাট' },
    { id: 'jhenaidah', name: 'ঝিনাইদহ' },
    { id: 'magura', name: 'মাগুরা' },
    { id: 'narail', name: 'নড়াইল' },
    { id: 'kushtia', name: 'কুষ্টিয়া' },
    { id: 'chuadanga', name: 'চুয়াডাঙ্গা' },
    { id: 'meherpur', name: 'মেহেরপুর' },
  ],
  barishal: [
    { id: 'barishal', name: 'বরিশাল' },
    { id: 'bhola', name: 'ভোলা' },
    { id: 'patuakhali', name: 'পটুয়াখালী' },
    { id: 'pirojpur', name: 'পিরোজপুর' },
    { id: 'jhalokati', name: 'ঝালকাঠি' },
    { id: 'barguna', name: 'বরগুনা' },
  ],
  chattogram: [
    { id: 'chattogram', name: 'চট্টগ্রাম' },
    { id: 'coxsbazar', name: 'কক্সবাজার' },
    { id: 'comilla', name: 'কুমিল্লা' },
    { id: 'feni', name: 'ফেনী' },
    { id: 'brahmanbaria', name: 'ব্রাহ্মণবাড়িয়া' },
    { id: 'noakhali', name: 'নোয়াখালী' },
    { id: 'lakshmipur', name: 'লক্ষ্মীপুর' },
    { id: 'chandpur', name: 'চাঁদপুর' },
    { id: 'rangamati', name: 'রাঙ্গামাটি' },
    { id: 'bandarban', name: 'বান্দরবান' },
    { id: 'khagrachhari', name: 'খাগড়াছড়ি' },
  ],
};

// Sample upazilas for each district (commonly known ones)
const UPAZILAS: Record<string, { id: string; name: string }[]> = {
  dhaka: [
    { id: 'dhanmondi', name: 'ধানমন্ডি' },
    { id: 'mirpur', name: 'মিরপুর' },
    { id: 'mohammadpur', name: 'মোহাম্মদপুর' },
    { id: 'uttara', name: 'উত্তরা' },
    { id: 'gulshan', name: 'গুলশান' },
    { id: 'tejgaon', name: 'তেজগাঁও' },
    { id: 'savar', name: 'সাভার' },
    { id: 'keraniganj', name: 'কেরানীগঞ্জ' },
    { id: 'dhamrai', name: 'ধামরাই' },
    { id: 'dohar', name: 'দোহার' },
    { id: 'nawabganj', name: 'নবাবগঞ্জ' },
  ],
  gazipur: [
    { id: 'gazipur-sadar', name: 'গাজীপুর সদর' },
    { id: 'kaliakair', name: 'কালিয়াকৈর' },
    { id: 'kaliganj', name: 'কালীগঞ্জ' },
    { id: 'kapasia', name: 'কাপাসিয়া' },
    { id: 'sreepur', name: 'শ্রীপুর' },
  ],
  narayanganj: [
    { id: 'narayanganj-sadar', name: 'নারায়ণগঞ্জ সদর' },
    { id: 'araihazar', name: 'আড়াইহাজার' },
    { id: 'bandar', name: 'বন্দর' },
    { id: 'rupganj', name: 'রূপগঞ্জ' },
    { id: 'sonargaon', name: 'সোনারগাঁও' },
  ],
  chattogram: [
    { id: 'chattogram-sadar', name: 'চট্টগ্রাম সদর' },
    { id: 'patiya', name: 'পটিয়া' },
    { id: 'sitakunda', name: 'সীতাকুণ্ড' },
    { id: 'hathazari', name: 'হাটহাজারী' },
    { id: 'raozan', name: 'রাউজান' },
    { id: 'anwara', name: 'আনোয়ারা' },
    { id: 'sandwip', name: 'সন্দ্বীপ' },
  ],
  coxsbazar: [
    { id: 'coxsbazar-sadar', name: 'কক্সবাজার সদর' },
    { id: 'teknaf', name: 'টেকনাফ' },
    { id: 'ukhia', name: 'উখিয়া' },
    { id: 'ramu', name: 'রামু' },
    { id: 'maheshkhali', name: 'মহেশখালী' },
  ],
  comilla: [
    { id: 'comilla-sadar', name: 'কুমিল্লা সদর' },
    { id: 'debidwar', name: 'দেবিদ্বার' },
    { id: 'chandina', name: 'চান্দিনা' },
    { id: 'laksam', name: 'লাকসাম' },
  ],
  rajshahi: [
    { id: 'rajshahi-sadar', name: 'রাজশাহী সদর' },
    { id: 'paba', name: 'পবা' },
    { id: 'godagari', name: 'গোদাগাড়ী' },
    { id: 'tanore', name: 'তানোর' },
    { id: 'bagmara', name: 'বাগমারা' },
  ],
  rangpur: [
    { id: 'rangpur-sadar', name: 'রংপুর সদর' },
    { id: 'gangachara', name: 'গঙ্গাচড়া' },
    { id: 'badarganj', name: 'বদরগঞ্জ' },
    { id: 'mithapukur', name: 'মিঠাপুকুর' },
    { id: 'pirganj', name: 'পীরগঞ্জ' },
  ],
  sylhet: [
    { id: 'sylhet-sadar', name: 'সিলেট সদর' },
    { id: 'bianibazar', name: 'বিয়ানীবাজার' },
    { id: 'golapganj', name: 'গোলাপগঞ্জ' },
    { id: 'jaintapur', name: 'জৈন্তাপুর' },
    { id: 'companiganj', name: 'কোম্পানীগঞ্জ' },
  ],
  khulna: [
    { id: 'khulna-sadar', name: 'খুলনা সদর' },
    { id: 'dumuria', name: 'ডুমুরিয়া' },
    { id: 'batiaghata', name: 'বটিয়াঘাটা' },
    { id: 'dakop', name: 'দাকোপ' },
    { id: 'koyra', name: 'কয়রা' },
  ],
  barishal: [
    { id: 'barishal-sadar', name: 'বরিশাল সদর' },
    { id: 'babuganj', name: 'বাবুগঞ্জ' },
    { id: 'bakerganj', name: 'বাকেরগঞ্জ' },
    { id: 'banaripara', name: 'বানারীপাড়া' },
  ],
  mymensingh: [
    { id: 'mymensingh-sadar', name: 'ময়মনসিংহ সদর' },
    { id: 'trishal', name: 'ত্রিশাল' },
    { id: 'bhaluka', name: 'ভালুকা' },
    { id: 'muktagachha', name: 'মুক্তাগাছা' },
    { id: 'fulbaria', name: 'ফুলবাড়িয়া' },
  ],
};

// SVG division IDs used in map.svg
const SVG_ID_MAP: Record<string, string> = {
  rangpur: 'rangpur',
  mymensingh: 'mymensingh',
  sylhet: 'sylhet',
  rajshahi: 'rajshahi',
  dhaka: 'dhaka',
  khulna: 'khulna',
  barishal: 'borishal',
  chattogram: 'chittagong',
};

// Reverse map: SVG id -> our division id
const REVERSE_SVG_ID: Record<string, string> = {};
for (const [key, val] of Object.entries(SVG_ID_MAP)) {
  REVERSE_SVG_ID[val] = key;
}

export default function BangladeshDivisionMap() {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedUpazila, setSelectedUpazila] = useState('');

  const districts = selectedDivision ? DISTRICTS[selectedDivision] || [] : [];
  const upazilas = selectedDistrict ? UPAZILAS[selectedDistrict] || [] : [];

  // Load SVG
  useEffect(() => {
    fetch('/bangladesh-map.svg')
      .then((res) => res.text())
      .then((text) => {
        // Remove the outer <svg> wrapper's style block hover rules for selected state handling
        // and strip empty <a> href wrappers so our click handlers work
        let cleaned = text
          .replace(/xlink:href=""/g, '')
          .replace(/href=""/g, '');
        setSvgContent(cleaned);
      });
  }, []);

  // Attach click handlers to division groups
  useEffect(() => {
    if (!mapRef.current || !svgContent) return;

    const svgEl = mapRef.current.querySelector('svg');
    if (!svgEl) return;

    const divisionIds = Object.values(SVG_ID_MAP);

    divisionIds.forEach((svgId) => {
      const group = svgEl.querySelector(`#${svgId}`);
      if (group) {
        (group as HTMLElement).style.cursor = 'pointer';
        group.addEventListener('click', () => {
          const divId = REVERSE_SVG_ID[svgId];
          if (divId) {
            setSelectedDivision(divId);
            setSelectedDistrict('');
            setSelectedUpazila('');
          }
        });
      }
    });
  }, [svgContent]);

  function handleDivisionChange(divId: string) {
    setSelectedDivision(divId);
    setSelectedDistrict('');
    setSelectedUpazila('');
  }

  function handleDistrictChange(distId: string) {
    setSelectedDistrict(distId);
    setSelectedUpazila('');
  }

  function handleSearch() {
    const params = new URLSearchParams();
    if (selectedUpazila) {
      const upa = upazilas.find((u) => u.id === selectedUpazila);
      if (upa) params.set('q', upa.name);
    } else if (selectedDistrict) {
      const dist = districts.find((d) => d.id === selectedDistrict);
      if (dist) params.set('q', dist.name);
    } else if (selectedDivision) {
      const div = DIVISIONS.find((d) => d.id === selectedDivision);
      if (div) params.set('q', div.name);
    }
    if (params.toString()) {
      router.push(`/search?${params.toString()}`);
    }
  }

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      {/* Map */}
      <div
        ref={mapRef}
        className="px-4 pt-4 pb-2 bg-background-secondary [&_svg]:w-full [&_svg]:h-auto [&_#rangpur]:cursor-pointer [&_#sylhet]:cursor-pointer [&_#rajshahi]:cursor-pointer [&_#mymensingh]:cursor-pointer [&_#dhaka]:cursor-pointer [&_#khulna]:cursor-pointer [&_#borishal]:cursor-pointer [&_#chittagong]:cursor-pointer"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />

      {/* Dropdowns */}
      <div className="px-4 py-3 space-y-2">
        <div className="grid grid-cols-3 gap-1.5">
          {/* Division */}
          <select
            value={selectedDivision}
            onChange={(e) => handleDivisionChange(e.target.value)}
            className="w-full px-2 py-2.5 text-[17px] font-semibold rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
          >
            <option value="">--বিভাগ--</option>
            {DIVISIONS.map((div) => (
              <option key={div.id} value={div.id}>
                {div.name}
              </option>
            ))}
          </select>

          {/* District */}
          <select
            value={selectedDistrict}
            onChange={(e) => handleDistrictChange(e.target.value)}
            disabled={!selectedDivision}
            className="w-full px-2 py-2.5 text-[17px] font-semibold rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">--জেলা--</option>
            {districts.map((dist) => (
              <option key={dist.id} value={dist.id}>
                {dist.name}
              </option>
            ))}
          </select>

          {/* Upazila */}
          <select
            value={selectedUpazila}
            onChange={(e) => setSelectedUpazila(e.target.value)}
            disabled={!selectedDistrict}
            className="w-full px-2 py-2.5 text-[17px] font-semibold rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">--উপজেলা--</option>
            {upazilas.map((upa) => (
              <option key={upa.id} value={upa.id}>
                {upa.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          disabled={!selectedDivision}
          className="w-full py-2.5 bg-accent text-white text-[15px] font-semibold rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          খুঁজুন
        </button>
      </div>
    </div>
  );
}
