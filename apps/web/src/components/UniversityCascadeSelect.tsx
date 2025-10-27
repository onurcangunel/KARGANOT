'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface University {
  id: string;
  ad: string;
  slug: string;
  fakulteler: Faculty[];
}

interface Faculty {
  id: string;
  ad: string;
  bolumler: Department[];
}

interface Department {
  id: string;
  ad: string;
  siniflar: number[];
  dersler: Course[];
}

interface Course {
  id: string;
  ad: string;
  sinif: number;
}

interface CascadeSelectProps {
  onSelectionChange: (selection: {
    university?: string;
    faculty?: string;
    department?: string;
    class?: number;
    course?: string;
  }) => void;
  initialValues?: {
    university?: string;
    faculty?: string;
    department?: string;
    class?: number;
    course?: string;
  };
}

export default function UniversityCascadeSelect({ onSelectionChange, initialValues }: CascadeSelectProps) {
  const [universities, setUniversities] = useState<University[]>([]);
  const [selectedUniversity, setSelectedUniversity] = useState<string>(initialValues?.university || '');
  const [selectedFaculty, setSelectedFaculty] = useState<string>(initialValues?.faculty || '');
  const [selectedDepartment, setSelectedDepartment] = useState<string>(initialValues?.department || '');
  const [selectedClass, setSelectedClass] = useState<number | undefined>(initialValues?.class);
  const [selectedCourse, setSelectedCourse] = useState<string>(initialValues?.course || '');

  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [classes, setClasses] = useState<number[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch('/data/universiteler.json')
      .then((res) => res.json())
      .then((data) => setUniversities(data.universiteler))
      .catch((err) => console.error('Üniversite verileri yüklenemedi:', err));
  }, []);

  useEffect(() => {
    if (selectedUniversity) {
      const uni = universities.find((u) => u.id === selectedUniversity);
      setFaculties(uni?.fakulteler || []);
      setSelectedFaculty('');
      setSelectedDepartment('');
      setSelectedClass(undefined);
      setSelectedCourse('');
      onSelectionChange({ university: selectedUniversity });
    } else {
      setFaculties([]);
    }
  }, [selectedUniversity, universities]);

  useEffect(() => {
    if (selectedFaculty) {
      const faculty = faculties.find((f) => f.id === selectedFaculty);
      setDepartments(faculty?.bolumler || []);
      setSelectedDepartment('');
      setSelectedClass(undefined);
      setSelectedCourse('');
      onSelectionChange({ university: selectedUniversity, faculty: selectedFaculty });
    } else {
      setDepartments([]);
    }
  }, [selectedFaculty, faculties]);

  useEffect(() => {
    if (selectedDepartment) {
      const dept = departments.find((d) => d.id === selectedDepartment);
      setClasses(dept?.siniflar || []);
      setSelectedClass(undefined);
      setSelectedCourse('');
      onSelectionChange({
        university: selectedUniversity,
        faculty: selectedFaculty,
        department: selectedDepartment,
      });
    } else {
      setClasses([]);
    }
  }, [selectedDepartment, departments]);

  useEffect(() => {
    if (selectedClass) {
      const dept = departments.find((d) => d.id === selectedDepartment);
      setCourses(dept?.dersler.filter((c) => c.sinif === selectedClass) || []);
      setSelectedCourse('');
      onSelectionChange({
        university: selectedUniversity,
        faculty: selectedFaculty,
        department: selectedDepartment,
        class: selectedClass,
      });
    } else {
      setCourses([]);
    }
  }, [selectedClass, departments]);

  useEffect(() => {
    if (selectedCourse) {
      onSelectionChange({
        university: selectedUniversity,
        faculty: selectedFaculty,
        department: selectedDepartment,
        class: selectedClass,
        course: selectedCourse,
      });
    }
  }, [selectedCourse]);

  const SelectBox = ({ 
    label, 
    value, 
    onChange, 
    options, 
    disabled, 
    placeholder 
  }: {
    label: string;
    value: string | number | undefined;
    onChange: (value: any) => void;
    options: { id: string | number; ad: string | number }[];
    disabled?: boolean;
    placeholder: string;
  }) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled || options.length === 0}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white text-gray-900 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.ad}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <SelectBox
        label="Üniversite"
        value={selectedUniversity}
        onChange={setSelectedUniversity}
        options={universities.map((u) => ({ id: u.id, ad: u.ad }))}
        placeholder="Üniversite Seçiniz"
      />

      <SelectBox
        label="Fakülte"
        value={selectedFaculty}
        onChange={setSelectedFaculty}
        options={faculties.map((f) => ({ id: f.id, ad: f.ad }))}
        disabled={!selectedUniversity}
        placeholder="Önce üniversite seçiniz"
      />

      <SelectBox
        label="Bölüm"
        value={selectedDepartment}
        onChange={setSelectedDepartment}
        options={departments.map((d) => ({ id: d.id, ad: d.ad }))}
        disabled={!selectedFaculty}
        placeholder="Önce fakülte seçiniz"
      />

      <SelectBox
        label="Sınıf"
        value={selectedClass}
        onChange={(val) => setSelectedClass(val ? parseInt(val) : undefined)}
        options={classes.map((c) => ({ id: c, ad: `${c}. Sınıf` }))}
        disabled={!selectedDepartment}
        placeholder="Önce bölüm seçiniz"
      />

      <SelectBox
        label="Ders"
        value={selectedCourse}
        onChange={setSelectedCourse}
        options={courses.map((c) => ({ id: c.id, ad: c.ad }))}
        disabled={!selectedClass}
        placeholder="Önce sınıf seçiniz"
      />
    </div>
  );
}
